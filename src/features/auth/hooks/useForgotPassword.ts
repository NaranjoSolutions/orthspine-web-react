import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useForgotPasswordMutation } from '../api/authApi';
import { ForgotPasswordFormData, ForgotPasswordFormErrors } from '../types';
import { ForgotPasswordValidator } from '@/shared/utils/validators/ForgotPasswordValidator';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { logger } from '@/infrastructure/logger/Logger';
import { generateNumericCaptcha, renderCaptchaToSVG } from '@/shared/utils/captcha/captchaUtils';

/**
 * useForgotPassword Hook - Facade Pattern
 * Encapsulates forgot password logic and provides simple interface for components
 * Integrated with Ant Design message notifications and numeric captcha
 */
export const useForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
    captcha: '',
  });

  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [captchaValue, setCaptchaValue] = useState<string>('');
  const [captchaSvg, setCaptchaSvg] = useState<string>('');

  /**
   * Generate a new captcha
   */
  const generateCaptcha = useCallback(() => {
    const newCaptcha = generateNumericCaptcha(4);
    setCaptchaValue(newCaptcha);
    setCaptchaSvg(renderCaptchaToSVG(newCaptcha));
  }, []);

  /**
   * Initialize captcha on component mount
   */
  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  /**
   * Handle input changes
   */
  const handleChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    try {
      // Clear previous errors
      setErrors({});

      // Validate form
      const validation = ForgotPasswordValidator.validateForgotPasswordForm({
        email: formData.email,
        captcha: formData.captcha,
        expectedCaptcha: captchaValue,
      });

      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      // Show loading message
      const hideLoading = message.loading('Sending reset link...', 0);

      try {
        // Call forgot password API
        const response = await forgotPassword({
          email: formData.email,
        }).unwrap();

        // Hide loading message
        hideLoading();

        // Show success message
        message.success(
          response.message || 'Password reset instructions have been sent to your email. Please check your inbox.',
          5,
        );

        logger.info('Password reset requested', { email: formData.email });

        // Navigate back to login after a short delay
        setTimeout(() => {
          navigate(ROUTE_PATHS.AUTH.LOGIN);
        }, 2000);
      } catch (error: unknown) {
        // Hide loading message
        hideLoading();

        // Handle API errors
        const apiError = error as { data?: { message?: string }; message?: string };
        const errorMessage =
          apiError?.data?.message ||
          apiError?.message ||
          'Unable to process your request at this time. Please try again or contact support if the issue persists.';

        setErrors({
          general: errorMessage,
        });

        message.error(errorMessage);
        logger.error('Forgot password failed', error);

        // Regenerate captcha on error
        generateCaptcha();
        setFormData((prev) => ({ ...prev, captcha: '' }));
      }
    } catch (error) {
      logger.error('Unexpected forgot password error', error);
      message.error('An unexpected error occurred. Please try again.');
      generateCaptcha();
      setFormData((prev) => ({ ...prev, captcha: '' }));
    }
  };

  /**
   * Handle back to login navigation
   */
  const handleBackToLogin = () => {
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

  return {
    formData,
    errors,
    isLoading,
    captchaSvg,
    handleChange,
    handleSubmit,
    handleBackToLogin,
    refreshCaptcha: generateCaptcha,
  };
};

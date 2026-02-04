import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useRegisterMutation } from '../api/authApi';
import { RegisterFormData, RegisterFormErrors } from '../types';
import { RegisterValidator } from '@/shared/utils/validators/RegisterValidator';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { logger } from '@/infrastructure/logger/Logger';

/**
 * useRegister Hook - Facade Pattern
 * Encapsulates registration logic and provides simple interface for components
 * Integrated with Ant Design message notifications
 */
export const useRegister = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState<RegisterFormData>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});

  /**
   * Handle input change
   */
  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error on change
    if (errors[field as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const validation = RegisterValidator.validateRegisterForm({
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (!validation.isValid) {
      setErrors(validation.errors as RegisterFormErrors);
      return false;
    }

    return true;
  };

  /**
   * Handle registration submission
   */
  const handleRegister = async (): Promise<void> => {
    try {
      // Clear previous errors
      setErrors({});

      // Validate form
      if (!validateForm()) {
        message.warning('Please fix the form errors');
        return;
      }

      // Show loading message
      const hideLoading = message.loading('Creating your account...', 0);

      try {
        // Call register API
        const response = await register({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }).unwrap();

        // Hide loading message
        hideLoading();

        // Log success for monitoring
        logger.info('Admin account request submitted', { email: formData.email });

        // Redirect to confirmation page (UI-only feedback)
        // Note: The actual account will need admin approval before login is possible
        navigate(ROUTE_PATHS.AUTH.ADMIN_REQUEST_CONFIRMATION);
      } catch (error: any) {
        // Hide loading message
        hideLoading();

        // Handle API errors
        const errorMessage = error?.data?.message || error?.message || 'Registration failed. Please try again.';

        setErrors({
          general: errorMessage,
        });

        message.error(errorMessage);
        logger.error('Registration failed', { error: errorMessage });
      }
    } catch (error: any) {
      // Catch any unexpected errors
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setErrors({
        general: errorMessage,
      });
      message.error(errorMessage);
      logger.error('Unexpected registration error', { error });
    }
  };

  /**
   * Handle navigate to login
   */
  const handleLoginRedirect = () => {
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleRegister,
    handleLoginRedirect,
  };
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { useLoginMutation } from '../api/authApi';
import { setUser, setTokens } from '../store/authSlice';
import { LoginFormData, LoginFormErrors } from '../types';
import { AuthService } from '../services/AuthService';
import { LoginValidator } from '@/shared/utils/validators/LoginValidator';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { logger } from '@/infrastructure/logger';

/**
 * useLogin Hook - Facade Pattern
 * Encapsulates login logic and provides simple interface for components
 * Integrated with Ant Design message notifications
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  /**
   * Handle input change
   */
  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error on change
    if (errors[field as keyof LoginFormErrors]) {
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
    const validation = LoginValidator.validateLoginForm({
      email: formData.email,
      password: formData.password,
    });

    if (!validation.isValid) {
      setErrors(validation.errors as LoginFormErrors);
      return false;
    }

    return true;
  };

  /**
   * Handle login submission
   */
  const handleLogin = async (): Promise<void> => {
    try {
      // Clear previous errors
      setErrors({});

      // Validate form
      if (!validateForm()) {
        message.warning('Please fix the form errors');
        return;
      }

      // Show loading message
      const hideLoading = message.loading('Signing in...', 0);

      try {
        // Call login API
        const response = await login({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }).unwrap();

        // Process response using AuthService (Repository Pattern)
        const user = AuthService.processLoginResponse(response, formData.rememberMe);

        // Update Redux state
        dispatch(setUser(user));
        dispatch(setTokens(response.tokens));

        // Hide loading message
        hideLoading();

        // Show success message
        message.success(`Welcome back, ${user.firstName}!`);

        logger.info('Login successful', { userId: user.id, email: user.email });

        // Navigate based on user role
        if (user.role === 'admin') {
          navigate(ROUTE_PATHS.ADMIN.DASHBOARD);
        } else {
          navigate(ROUTE_PATHS.HOME);
        }
      } catch (error: any) {
        // Hide loading message
        hideLoading();

        // Handle API errors
        const errorMessage = error?.data?.message || error?.message || 'Login failed. Please check your credentials.';

        setErrors({
          general: errorMessage,
        });

        message.error(errorMessage);
        logger.error('Login failed', error);
      }
    } catch (error) {
      logger.error('Unexpected login error', error);
      message.error('An unexpected error occurred. Please try again.');
    }
  };

  /**
   * Handle forgot password navigation
   */
  const handleForgotPassword = () => {
    navigate(ROUTE_PATHS.AUTH.FORGOT_PASSWORD);
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    handleForgotPassword,
  };
};

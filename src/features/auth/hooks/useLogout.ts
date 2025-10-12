import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { useLogoutMutation } from '../api/authApi';
import { clearAuth } from '../store/authSlice';
import { AuthService } from '../services/AuthService';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import { logger } from '@/infrastructure/logger';

/**
 * useLogout Hook - Facade Pattern
 * Encapsulates logout logic and provides simple interface for components
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  /**
   * Handle logout
   */
  const handleLogout = async (): Promise<void> => {
    try {
      // Show loading message
      const hideLoading = message.loading('Signing out...', 0);

      try {
        // Call logout API (optional - can fail silently)
        await logoutMutation().unwrap();
      } catch (error) {
        // API logout failed, but we still clear local state
        logger.warn('Logout API call failed, but clearing local state', error);
      }

      // Process logout (clear tokens)
      AuthService.processLogout();

      // Clear Redux state
      dispatch(clearAuth());

      // Hide loading message
      hideLoading();

      // Show success message
      message.success('You have been logged out successfully');

      logger.info('User logged out successfully');

      // Navigate to login
      navigate(ROUTE_PATHS.AUTH.LOGIN);
    } catch (error) {
      logger.error('Unexpected logout error', error);
      message.error('An error occurred during logout. Please try again.');
    }
  };

  return {
    handleLogout,
    isLoading,
  };
};

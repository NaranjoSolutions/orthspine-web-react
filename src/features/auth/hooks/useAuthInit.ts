import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setTokens } from '../store/authSlice';
import { tokenService } from '../services/TokenService';
import { logger } from '@/infrastructure/logger';

/**
 * useAuthInit Hook
 * Initializes authentication state from storage on app mount
 * 
 * This hook checks if there are valid tokens in storage and restores
 * the authentication state if the user was previously logged in.
 * 
 * Design Pattern: Facade - Encapsulates complex initialization logic
 */
export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = () => {
      try {
        // Check if user has valid authentication
        if (tokenService.hasValidAuth()) {
          const accessToken = tokenService.getAccessToken();
          const refreshToken = tokenService.getRefreshToken();

          if (accessToken && refreshToken) {
            // Restore tokens in Redux state
            dispatch(
              setTokens({
                accessToken,
                refreshToken,
                expiresIn: 3600, // Default expiry
              }),
            );

            // Note: User data should ideally be fetched from API here
            // For now, we just restore the tokens
            // TODO: Add API call to fetch current user data
            logger.info('Authentication state restored from storage');
          }
        } else {
          logger.info('No valid authentication found in storage');
          tokenService.clearTokens();
        }
      } catch (error) {
        logger.error('Failed to initialize authentication', error);
        tokenService.clearTokens();
      }
    };

    initAuth();
  }, [dispatch]);
};

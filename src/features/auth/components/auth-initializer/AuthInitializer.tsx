import React, { useEffect } from 'react';
import { useGetCurrentUserQuery } from '../../api/authApi';
import { useAppDispatch } from '@/store';
import { setUser } from '../../store/authSlice';
import { tokenService } from '../../services/TokenService';
import { logger } from '@/infrastructure/logger/Logger';

interface AuthInitializerProps {
  children: React.ReactNode;
}

/**
 * AuthInitializer Component
 * Restores authentication state on app initialization
 *
 * Purpose:
 * - Checks if valid tokens exist in storage
 * - Fetches current user data from API if tokens are valid
 * - Restores user data to Redux state
 * - Enables seamless authentication across page refreshes
 *
 * Design Principles:
 * - Single Responsibility: Only handles auth state restoration
 * - Separation of Concerns: Uses TokenService for token management
 * - Fail-Safe: Clears invalid tokens and continues rendering
 *
 * Flow:
 * 1. Check if valid auth tokens exist on mount
 * 2. If tokens exist, fetch current user data
 * 3. On success: Update Redux state with user data
 * 4. On error: Clear invalid tokens and continue
 * 5. Render children regardless of auth state
 */
export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  
  // Check if we have valid tokens before making the API call
  const hasValidTokens = tokenService.hasValidAuth();
  
  // Only fetch current user if we have valid tokens
  // skip: true will prevent the query from running if we don't have tokens
  const { data: user, error, isSuccess, isError } = useGetCurrentUserQuery(undefined, {
    skip: !hasValidTokens,
  });

  useEffect(() => {
    if (isSuccess && user) {
      // Successfully fetched user data, restore to Redux
      dispatch(setUser(user));
      logger.info('Auth state restored from tokens', { userId: user.userId });
    }

    if (isError) {
      // Token is invalid or expired, clear it
      logger.warn('Failed to restore auth state, clearing tokens', error);
      tokenService.clearTokens();
    }
  }, [isSuccess, isError, user, error, dispatch]);

  // Always render children - auth state restoration is transparent
  // Guards will handle redirects based on the restored state
  return <>{children}</>;
};

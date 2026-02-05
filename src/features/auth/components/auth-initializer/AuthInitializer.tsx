import React, { useEffect, useMemo } from 'react';
import { useGetCurrentUserQuery } from '../../api/authApi';
import { useAppDispatch } from '@/store';
import { setUser, setTokens } from '../../store/authSlice';
import { tokenService } from '../../services/TokenService';
import { AuthService } from '../../services/AuthService';
import { logger } from '@/infrastructure/logger/Logger';
import { AuthTokens, User } from '../../types';

/**
 * Token expiration sentinel value
 *
 * Value: -1
 * Meaning: Token expiration time is unknown or managed externally
 * Usage: Set when restoring tokens from storage without expiration metadata
 * Handling: TokenService manages actual expiration in localStorage/sessionStorage
 *
 * Why -1?
 * - Distinguishes from 0 (immediate expiration)
 * - Negative value clearly indicates "not applicable/unknown"
 * - Matches common sentinel value pattern in systems programming
 */
const UNKNOWN_EXPIRATION = -1;

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
  // Memoized with empty dependency array to run only once on mount
  // Note: This is intentional for app initialization - we only want to check auth state
  // on initial load. Token changes after mount are handled by login/logout flows.
  const hasValidTokens = useMemo(() => tokenService.hasValidAuth(), []);

  // Only fetch current user if we have valid tokens
  // skip: true will prevent the query from running if we don't have tokens
  const {
    data: user,
    error,
    isSuccess,
    isError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !hasValidTokens,
  });

  useEffect(() => {
    if (isSuccess && user) {
      // Normalize user role using AuthService (centralized validation logic)
      const validRole = AuthService.validateUserRole(user.userRole);

      const normalizedUser: User = {
        ...user,
        userRole: validRole,
      };

      // Successfully fetched user data, restore to Redux
      dispatch(setUser(normalizedUser));

      // Also restore tokens to Redux state for consistency
      const accessToken = tokenService.getAccessToken();
      const refreshToken = tokenService.getRefreshToken();

      if (accessToken && refreshToken) {
        // Use UNKNOWN_EXPIRATION sentinel value to indicate expiration is managed by TokenService
        const tokens: AuthTokens = {
          accessToken,
          refreshToken,
          accessTokenExpiresIn: UNKNOWN_EXPIRATION,
          refreshTokenExpiresIn: UNKNOWN_EXPIRATION,
        };
        dispatch(setTokens(tokens));
      }

      logger.info('Auth state restored from tokens', {
        userId: normalizedUser.userId,
        role: normalizedUser.userRole,
      });
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

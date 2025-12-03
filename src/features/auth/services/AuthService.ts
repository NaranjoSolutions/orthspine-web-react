import { LoginCredentials, AuthResponse, User, UserRole } from '../types';
import { tokenService } from './TokenService';
import { logger } from '@/infrastructure/logger/Logger';

/**
 * AuthService - Repository Pattern
 * Encapsulates authentication business logic
 */
export class AuthService {
  /**
   * Process login response
   * Saves tokens and returns user data
   */
  static processLoginResponse(response: AuthResponse, rememberMe: boolean): User {
    try {
      // Save tokens using TokenService (Singleton)
      tokenService.saveTokens(response.tokens, rememberMe);

      // Normalize user role to lowercase to ensure consistency
      // API might return different casing (e.g., "Admin" vs "admin")
      const normalizedUser: User = {
        ...response.user,
        userRole: response.user.userRole.toLowerCase() as UserRole,
      };

      logger.info('User logged in successfully', {
        userId: normalizedUser.userId,
        email: normalizedUser.email,
      });

      return normalizedUser;
    } catch (error) {
      logger.error('Failed to process login response', error);
      throw new Error('Failed to save authentication data');
    }
  }

  /**
   * Process registration response
   * Returns user data and tokens
   */
  static processRegisterResponse(response: AuthResponse): User {
    try {
      // Normalize user role to lowercase to ensure consistency
      // API might return different casing (e.g., "Admin" vs "admin")
      const normalizedUser: User = {
        ...response.user,
        userRole: response.user.userRole.toLowerCase() as UserRole,
      };

      logger.info('User registered successfully', {
        userId: normalizedUser.userId,
        email: normalizedUser.email,
      });

      return normalizedUser;
    } catch (error) {
      logger.error('Failed to process registration response', error);
      throw new Error('Failed to save authentication data');
    }
  }

  /**
   * Process logout
   * Clears all authentication data
   */
  static processLogout(): void {
    try {
      tokenService.clearTokens();
      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Failed to process logout', error);
      throw new Error('Failed to clear authentication data');
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return tokenService.hasValidAuth();
  }

  /**
   * Get stored access token
   */
  static getAccessToken(): string | null {
    return tokenService.getAccessToken();
  }

  /**
   * Validate login credentials before API call
   */
  static validateCredentials(credentials: LoginCredentials): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!credentials.email || credentials.email.trim().length === 0) {
      errors.email = 'Email is required';
    }

    if (!credentials.password || credentials.password.length === 0) {
      errors.password = 'Password is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

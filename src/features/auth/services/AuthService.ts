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

      // Normalize and validate user role to ensure consistency
      // API might return different casing (e.g., "Admin" vs "admin")
      const validRole = AuthService.validateUserRole(response.user.userRole);

      const normalizedUser: User = {
        ...response.user,
        userRole: validRole,
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
      // Normalize and validate user role to ensure consistency
      // API might return different casing (e.g., "Admin" vs "admin")
      const validRole = AuthService.validateUserRole(response.user.userRole);

      const normalizedUser: User = {
        ...response.user,
        userRole: validRole,
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
   * Validate and normalize user role
   * Returns a valid UserRole enum value, defaults to USER if invalid
   */
  static validateUserRole(role: string): UserRole {
    const normalizedRole = role.toUpperCase();

    // Check if the normalized role is a valid UserRole enum value
    const isValidRole = Object.values(UserRole).some((value) => value === normalizedRole);

    if (isValidRole) {
      return normalizedRole as UserRole;
    }

    // Log warning for invalid role and return default
    logger.warn('Invalid user role received from API, defaulting to USER', { receivedRole: role });
    return UserRole.USER;
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

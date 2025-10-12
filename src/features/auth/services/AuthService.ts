import { LoginCredentials, AuthResponse, User } from '../types';
import { tokenService } from './TokenService';
import { logger } from '@/infrastructure/logger';

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

      logger.info('User logged in successfully', {
        userId: response.user.id,
        email: response.user.email,
      });

      return response.user;
    } catch (error) {
      logger.error('Failed to process login response', error);
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

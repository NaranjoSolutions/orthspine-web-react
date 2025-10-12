import { ValidationResult } from './ValidationResult';

/**
 * LoginValidator - Validator Pattern
 * Validates login form inputs
 */
export class LoginValidator {
  /**
   * Validates email input
   */
  static validateEmail(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return {
        isValid: false,
        error: 'Email is required',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return {
        isValid: false,
        error: 'Invalid email format',
      };
    }

    return { isValid: true };
  }

  /**
   * Validates password input
   */
  static validatePassword(value: string): ValidationResult {
    if (!value || value.length === 0) {
      return {
        isValid: false,
        error: 'Password is required',
      };
    }

    if (value.length < 4) {
      return {
        isValid: false,
        error: 'Password must be at least 4 characters',
      };
    }

    return { isValid: true };
  }

  /**
   * Validates entire login form
   */
  static validateLoginForm(data: { email: string; password: string }): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    const emailResult = this.validateEmail(data.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.error!;
    }

    const passwordResult = this.validatePassword(data.password);
    if (!passwordResult.isValid) {
      errors.password = passwordResult.error!;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

import { ValidationResult } from './ValidationResult';

/**
 * RegisterValidator - Validator Pattern
 * Validates registration form inputs
 */
export class RegisterValidator {
  /**
   * Validates full name input
   */
  static validateFullName(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return {
        isValid: false,
        error: 'Full name is required',
      };
    }

    if (value.trim().length < 2) {
      return {
        isValid: false,
        error: 'Full name must be at least 2 characters',
      };
    }

    return { isValid: true };
  }

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

    if (value.length < 8) {
      return {
        isValid: false,
        error: 'Password must be at least 8 characters',
      };
    }

    return { isValid: true };
  }

  /**
   * Validates confirm password input
   */
  static validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
    if (!confirmPassword || confirmPassword.length === 0) {
      return {
        isValid: false,
        error: 'Please confirm your password',
      };
    }

    if (password !== confirmPassword) {
      return {
        isValid: false,
        error: 'Passwords do not match',
      };
    }

    return { isValid: true };
  }

  /**
   * Validates entire registration form
   */
  static validateRegisterForm(data: { fullName: string; email: string; password: string; confirmPassword: string }): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    const fullNameResult = this.validateFullName(data.fullName);
    if (!fullNameResult.isValid) {
      errors.fullName = fullNameResult.error!;
    }

    const emailResult = this.validateEmail(data.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.error!;
    }

    const passwordResult = this.validatePassword(data.password);
    if (!passwordResult.isValid) {
      errors.password = passwordResult.error!;
    }

    const confirmPasswordResult = this.validateConfirmPassword(data.password, data.confirmPassword);
    if (!confirmPasswordResult.isValid) {
      errors.confirmPassword = confirmPasswordResult.error!;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

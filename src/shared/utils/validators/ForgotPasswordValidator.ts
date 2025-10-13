import { ValidationResult } from './ValidationResult';

/**
 * ForgotPasswordValidator - Validator Pattern
 * Validates forgot password form inputs
 */
export class ForgotPasswordValidator {
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
   * Validates captcha input
   */
  static validateCaptcha(value: string, expectedValue: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return {
        isValid: false,
        error: 'Captcha is required',
      };
    }

    if (value !== expectedValue) {
      return {
        isValid: false,
        error: 'Incorrect captcha. Please try again',
      };
    }

    return { isValid: true };
  }

  /**
   * Validates entire forgot password form
   */
  static validateForgotPasswordForm(data: {
    email: string;
    captcha: string;
    expectedCaptcha: string;
  }): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    const emailResult = this.validateEmail(data.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.error!;
    }

    const captchaResult = this.validateCaptcha(data.captcha, data.expectedCaptcha);
    if (!captchaResult.isValid) {
      errors.captcha = captchaResult.error!;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

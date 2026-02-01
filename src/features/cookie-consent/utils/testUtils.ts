/**
 * Cookie Consent Test Utilities
 * Helper functions for testing and debugging cookie consent
 */

import { CookieConsentService } from '../services';
import type { CookieConsentState } from '../types';

// Extend Window interface for TypeScript
declare global {
  interface Window {
    CookieConsentTestUtils: typeof CookieConsentTestUtils;
  }
}

/**
 * Test utilities for cookie consent
 */
export class CookieConsentTestUtils {
  /**
   * Clear all cookie consent data (useful for testing)
   */
  static reset(): void {
    CookieConsentService.clearConsent();
    console.log('✅ Cookie consent data cleared');
  }

  /**
   * Log current consent state to console
   */
  static logState(): void {
    const consent = CookieConsentService.getConsent();
    console.group('🍪 Cookie Consent State');
    console.table(consent);
    console.groupEnd();
  }

  /**
   * Set a custom consent state (for testing)
   */
  static setCustomState(state: Partial<CookieConsentState>): void {
    const currentState = CookieConsentService.getConsent();
    const newState: CookieConsentState = {
      ...currentState,
      ...state,
      timestamp: Date.now(),
    };
    CookieConsentService.setConsent(newState);
    console.log('✅ Custom consent state set:', newState);
  }

  /**
   * Simulate first-time visitor
   */
  static simulateFirstVisit(): void {
    this.reset();
    console.log('✅ Simulated first visit - banner should appear on refresh');
  }

  /**
   * Simulate returning visitor who accepted all
   */
  static simulateAcceptedAll(): void {
    CookieConsentService.acceptAll();
    console.log('✅ Simulated user who accepted all cookies');
  }

  /**
   * Simulate returning visitor who rejected non-essential
   */
  static simulateRejectedNonEssential(): void {
    CookieConsentService.rejectNonEssential();
    console.log('✅ Simulated user who rejected non-essential cookies');
  }

  /**
   * Check if localStorage is available
   */
  static checkLocalStorage(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      console.log('✅ localStorage is available');
      return true;
    } catch (error) {
      console.error('❌ localStorage is not available:', error);
      return false;
    }
  }

  /**
   * Get raw localStorage value
   */
  static getRawValue(): string | null {
    const value = localStorage.getItem('cookie-consent');
    console.log('Raw localStorage value:', value);
    return value;
  }

  /**
   * Validate consent state structure
   */
  static validateState(): boolean {
    const consent = CookieConsentService.getConsent();
    
    const isValid = 
      typeof consent.hasConsented === 'boolean' &&
      typeof consent.strictlyNecessary === 'boolean' &&
      typeof consent.functional === 'boolean' &&
      typeof consent.performance === 'boolean' &&
      typeof consent.timestamp === 'number';

    if (isValid) {
      console.log('✅ Consent state structure is valid');
    } else {
      console.error('❌ Consent state structure is invalid');
    }

    return isValid;
  }
}

// Expose to window for browser console access (development only)
if (import.meta.env.DEV) {
  window.CookieConsentTestUtils = CookieConsentTestUtils;
  console.log(
    '🍪 Cookie Consent Test Utils available in console:\n' +
    '  - CookieConsentTestUtils.reset()\n' +
    '  - CookieConsentTestUtils.logState()\n' +
    '  - CookieConsentTestUtils.simulateFirstVisit()\n' +
    '  - CookieConsentTestUtils.simulateAcceptedAll()\n' +
    '  - CookieConsentTestUtils.simulateRejectedNonEssential()\n' +
    '  - CookieConsentTestUtils.checkLocalStorage()\n' +
    '  - CookieConsentTestUtils.getRawValue()\n' +
    '  - CookieConsentTestUtils.validateState()'
  );
}

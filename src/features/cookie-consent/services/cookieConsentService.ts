/**
 * Cookie Consent Service
 * Handles persistence and retrieval of cookie consent preferences
 */

import type { CookieConsentState } from '../types';
import { DEFAULT_COOKIE_CONSENT } from '../types';

const STORAGE_KEY = 'cookie-consent';

/**
 * Cookie Consent Service
 * Provides methods to manage cookie consent in localStorage
 */
export class CookieConsentService {
  /**
   * Get current cookie consent state from localStorage
   * @returns Cookie consent state or default if not found
   */
  static getConsent(): CookieConsentState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return DEFAULT_COOKIE_CONSENT;
      }
      
      const parsed = JSON.parse(stored) as CookieConsentState;
      
      // Validate the stored data structure
      if (
        typeof parsed.hasConsented !== 'boolean' ||
        typeof parsed.strictlyNecessary !== 'boolean' ||
        typeof parsed.functional !== 'boolean' ||
        typeof parsed.performance !== 'boolean' ||
        typeof parsed.timestamp !== 'number'
      ) {
        console.warn('Invalid cookie consent data in localStorage, using defaults');
        return DEFAULT_COOKIE_CONSENT;
      }
      
      return parsed;
    } catch (error) {
      console.error('Error reading cookie consent from localStorage:', error);
      return DEFAULT_COOKIE_CONSENT;
    }
  }

  /**
   * Save cookie consent state to localStorage
   * @param consent - Cookie consent state to save
   */
  static setConsent(consent: CookieConsentState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      console.error('Error saving cookie consent to localStorage:', error);
    }
  }

  /**
   * Clear cookie consent from localStorage
   */
  static clearConsent(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cookie consent from localStorage:', error);
    }
  }

  /**
   * Accept all cookies
   * @returns Updated cookie consent state
   */
  static acceptAll(): CookieConsentState {
    const consent: CookieConsentState = {
      hasConsented: true,
      strictlyNecessary: true,
      functional: true,
      performance: true,
      timestamp: Date.now(),
    };
    
    this.setConsent(consent);
    return consent;
  }

  /**
   * Reject non-essential cookies (only keep strictly necessary)
   * @returns Updated cookie consent state
   */
  static rejectNonEssential(): CookieConsentState {
    const consent: CookieConsentState = {
      hasConsented: true,
      strictlyNecessary: true,
      functional: false,
      performance: false,
      timestamp: Date.now(),
    };
    
    this.setConsent(consent);
    return consent;
  }

  /**
   * Save custom preferences
   * @param functional - Functional cookies consent
   * @param performance - Performance & analytics cookies consent
   * @returns Updated cookie consent state
   */
  static savePreferences(functional: boolean, performance: boolean): CookieConsentState {
    const consent: CookieConsentState = {
      hasConsented: true,
      strictlyNecessary: true,
      functional,
      performance,
      timestamp: Date.now(),
    };
    
    this.setConsent(consent);
    return consent;
  }

  /**
   * Check if user has already consented
   * @returns True if user has made a consent decision
   */
  static hasConsented(): boolean {
    const consent = this.getConsent();
    return consent.hasConsented;
  }

  /**
   * Check if a specific cookie category is enabled
   * @param category - Cookie category to check
   * @returns True if the category is enabled
   */
  static isCategoryEnabled(category: keyof Omit<CookieConsentState, 'hasConsented' | 'timestamp'>): boolean {
    const consent = this.getConsent();
    return consent[category];
  }
}

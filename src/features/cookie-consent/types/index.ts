/**
 * Cookie Consent Types
 * TypeScript interfaces and types for cookie consent management
 */

/**
 * Cookie consent state stored in localStorage
 */
export interface CookieConsentState {
  /** Whether the user has made a consent decision */
  hasConsented: boolean;
  /** Strictly necessary cookies (always true) */
  strictlyNecessary: boolean;
  /** Functional cookies consent */
  functional: boolean;
  /** Performance & analytics cookies consent */
  performance: boolean;
  /** Timestamp when consent was given */
  timestamp: number;
}

/**
 * Cookie category types
 */
export type CookieCategoryType = 'strictlyNecessary' | 'functional' | 'performance';

/**
 * Cookie category metadata
 */
export interface CookieCategory {
  key: CookieCategoryType;
  title: string;
  description: string;
  isRequired: boolean;
}

/**
 * Default cookie consent state for new users
 */
export const DEFAULT_COOKIE_CONSENT: CookieConsentState = {
  hasConsented: false,
  strictlyNecessary: true, // Always enabled
  functional: false,
  performance: false,
  timestamp: 0,
};

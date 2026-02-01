/**
 * useCookieConsent Hook
 * Custom hook for managing cookie consent state
 */

import { useState, useEffect, useCallback } from 'react';
import type { CookieConsentState } from '../types';
import { CookieConsentService } from '../services';

/**
 * Return type for useCookieConsent hook
 */
interface UseCookieConsentReturn {
  /** Current cookie consent state */
  consent: CookieConsentState;
  /** Whether the user has made a consent decision */
  hasConsented: boolean;
  /** Accept all cookies */
  acceptAll: () => void;
  /** Reject non-essential cookies */
  rejectNonEssential: () => void;
  /** Save custom preferences */
  savePreferences: (functional: boolean, performance: boolean) => void;
  /** Clear all consent (for testing/debugging) */
  clearConsent: () => void;
}

/**
 * Custom hook for managing cookie consent
 * 
 * @returns Cookie consent state and management functions
 * 
 * @example
 * ```tsx
 * const { consent, hasConsented, acceptAll, rejectNonEssential } = useCookieConsent();
 * 
 * if (!hasConsented) {
 *   return <CookieConsentBanner onAccept={acceptAll} onReject={rejectNonEssential} />;
 * }
 * ```
 */
export const useCookieConsent = (): UseCookieConsentReturn => {
  const [consent, setConsent] = useState<CookieConsentState>(() => 
    CookieConsentService.getConsent()
  );

  // Sync state with localStorage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent' && e.newValue) {
        try {
          const newConsent = JSON.parse(e.newValue) as CookieConsentState;
          setConsent(newConsent);
        } catch (error) {
          console.error('Error parsing cookie consent from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Accept all cookies
   */
  const acceptAll = useCallback(() => {
    const newConsent = CookieConsentService.acceptAll();
    setConsent(newConsent);
  }, []);

  /**
   * Reject non-essential cookies
   */
  const rejectNonEssential = useCallback(() => {
    const newConsent = CookieConsentService.rejectNonEssential();
    setConsent(newConsent);
  }, []);

  /**
   * Save custom preferences
   */
  const savePreferences = useCallback((functional: boolean, performance: boolean) => {
    const newConsent = CookieConsentService.savePreferences(functional, performance);
    setConsent(newConsent);
  }, []);

  /**
   * Clear consent (mainly for testing/debugging)
   */
  const clearConsent = useCallback(() => {
    CookieConsentService.clearConsent();
    setConsent(CookieConsentService.getConsent());
  }, []);

  return {
    consent,
    hasConsented: consent.hasConsented,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    clearConsent,
  };
};

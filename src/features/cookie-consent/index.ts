/**
 * Cookie Consent Feature
 * Public API for cookie consent functionality
 *
 * This feature provides a complete cookie consent solution following GDPR guidelines.
 * It includes a banner for first-time visitors and a preferences modal for managing
 * cookie categories.
 *
 * @example
 * ```tsx
 * // In your App.tsx or root component
 * import { CookieConsentBanner } from '@/features/cookie-consent';
 *
 * function App() {
 *   return (
 *     <>
 *       <YourAppContent />
 *       <CookieConsentBanner />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Using the hook in a component
 * import { useCookieConsent } from '@/features/cookie-consent';
 *
 * function MyComponent() {
 *   const { consent, hasConsented } = useCookieConsent();
 *
 *   // Only load analytics if user consented to performance cookies
 *   useEffect(() => {
 *     if (consent.performance) {
 *       loadAnalytics();
 *     }
 *   }, [consent.performance]);
 * }
 * ```
 */

// Components
export { CookieConsentBanner } from './components/CookieConsentBanner';
export { CookiePreferencesModal } from './components/CookiePreferencesModal';

// Hooks
export { useCookieConsent } from './hooks';

// Services
export { CookieConsentService } from './services';

// Types
export type { CookieConsentState, CookieCategoryType, CookieCategory } from './types';
export { DEFAULT_COOKIE_CONSENT } from './types';

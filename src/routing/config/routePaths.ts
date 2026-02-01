/**
 * Centralized Route Path Constants
 *
 * Benefits:
 * - Type-safe route paths
 * - Single source of truth
 * - Easy refactoring (change once, update everywhere)
 * - Prevents typos in route strings
 *
 * Design Principle: DRY (Don't Repeat Yourself)
 */
export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  TESTIMONIALS: '/testimonials',
  BOOK_APPOINTMENT: '/book-appointment',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',

  // Service Detail Pages
  SERVICE_DETAILS: {
    SPINE: '/services/spine',
    KNEE: '/services/knee',
    HIP: '/services/hip',
    SHOULDER: '/services/shoulder',
    FOOT_AND_HAND: '/services/foot-and-hand',
    REHABILITATION: '/services/rehabilitation',
    CIRCULATION: '/services/circulation',
    SPORTS: '/services/sports',
  },

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },

  ADMIN: {
    DASHBOARD: '/admin',
    PATIENTS: '/admin/patients',
    PATIENT_DETAILS: '/admin/patients/:id',
    APPOINTMENTS: '/admin/appointments',
    TESTIMONIALS: '/admin/testimonials',
    SETTINGS: '/admin/settings',
  },

  NOT_FOUND: '*',
  UNAUTHORIZED: '/unauthorized',
} as const;

// Type for route paths (for type safety in navigation)
export type RoutePath = typeof ROUTE_PATHS;

/**
 * Helper function to build parameterized routes
 *
 * @example
 * buildRoute(ROUTE_PATHS.AUTH.RESET_PASSWORD, { token: 'abc123' })
 * // Returns: '/reset-password/abc123'
 */
export const buildRoute = (path: string, params: Record<string, string>): string => {
  return Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), path);
};

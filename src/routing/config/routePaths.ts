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

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },

  ADMIN: {
    DASHBOARD: '/admin',
    TESTIMONIALS: '/admin/testimonials',
  },

  NOT_FOUND: '*',
  UNAUTHORIZED: '/unauthorized',
} as const;

// Type for route paths (for type safety in navigation)
export type RoutePath = typeof ROUTE_PATHS;

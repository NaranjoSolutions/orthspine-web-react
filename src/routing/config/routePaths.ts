/**
 * Centralized route path constants
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

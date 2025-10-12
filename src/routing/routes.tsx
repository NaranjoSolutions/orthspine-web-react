import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { AdminLayout } from '@/shared/layouts/AdminLayout';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
import { RoleGuard } from './guards/RoleGuard';
import { ROUTE_PATHS } from './config/routePaths';
import { UserRole } from '@/features/auth/types';

/**
 * Lazy-loaded page components
 * Code splitting for optimal performance
 */
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage'));

// Auth pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));

// Admin pages
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const TestimonialsAdminPage = lazy(() => import('@/pages/admin/TestimonialsAdminPage'));

// Error pages
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));

/**
 * Application Routes Configuration
 *
 * Architecture:
 * - Nested routes with layout wrappers
 * - Route guards for authentication and authorization
 * - Lazy loading for code splitting
 * - Type-safe route paths from constants
 *
 * Route Hierarchy:
 * 1. Public routes (MainLayout)
 * 2. Guest-only routes (AuthLayout + GuestGuard)
 * 3. Protected routes (AdminLayout + AuthGuard + RoleGuard)
 *
 * Design Patterns:
 * - Composite Pattern: Nested route structure
 * - Chain of Responsibility: Multiple guards can be chained
 * - Strategy Pattern: Different layouts for different route types
 */
export const routes: RouteObject[] = [
  /**
   * Public Routes - MainLayout
   * Accessible to all users
   */
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTE_PATHS.SERVICES,
        element: <ServicesPage />,
      },
      {
        path: ROUTE_PATHS.CONTACT,
        element: <ContactPage />,
      },
      {
        path: ROUTE_PATHS.TESTIMONIALS,
        element: <TestimonialsPage />,
      },
    ],
  },

  /**
   * Guest-Only Routes - AuthLayout
   * Only accessible to unauthenticated users
   * Protected by GuestGuard (redirects if authenticated)
   */
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTE_PATHS.AUTH.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTE_PATHS.AUTH.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
        ],
      },
    ],
  },

  /**
   * Protected Admin Routes - AdminLayout
   * Requires authentication AND admin role
   * Protected by AuthGuard + RoleGuard chain
   */
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard allowedRoles={[UserRole.ADMIN]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: ROUTE_PATHS.ADMIN.DASHBOARD,
                element: <AdminDashboardPage />,
              },
              {
                path: ROUTE_PATHS.ADMIN.TESTIMONIALS,
                element: <TestimonialsAdminPage />,
              },
            ],
          },
        ],
      },
    ],
  },

  /**
   * Error Routes
   */
  {
    path: ROUTE_PATHS.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <NotFoundPage />,
  },
];

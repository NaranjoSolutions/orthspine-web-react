import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/shared/layouts/main-layout';
import { AuthLayout } from '@/shared/layouts/auth-layout';
import { AdminLayout } from '@/shared/layouts/admin-layout';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
import { RoleGuard } from './guards/RoleGuard';
import { ROUTE_PATHS } from './config/routePaths';
import { UserRole } from '@/features/auth/types';

/**
 * Lazy-loaded page components
 * Code splitting for optimal performance
 */
const HomePage = lazy(() => import('@/pages/home'));
const AboutPage = lazy(() => import('@/pages/about'));
const ServicesPage = lazy(() => import('@/pages/services'));
const ServiceDetailPage = lazy(() => import('@/pages/service-detail'));
const ContactPage = lazy(() => import('@/pages/contact'));
const TestimonialsPage = lazy(() => import('@/pages/testimonials'));
const BookAppointmentPage = lazy(() => import('@/pages/book-appointment'));
const PrivacyPolicyPage = lazy(() => import('@/pages/privacy-policy'));
const TermsOfServicePage = lazy(() => import('@/pages/terms-of-service'));

// Auth pages
const LoginPage = lazy(() => import('@/pages/auth/login-page'));
const RegisterPage = lazy(() => import('@/pages/auth/register-page'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password-page'));
const AdminRequestConfirmationPage = lazy(() => import('@/pages/auth/admin-request-confirmation-page'));

// Admin pages
const AdminDashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const PatientsPage = lazy(() => import('@/pages/admin/PatientsPage'));
const PatientDetailsPage = lazy(() => import('@/pages/admin/PatientDetailsPage'));
const AppointmentsPage = lazy(() => import('@/pages/admin/AppointmentsPage'));
const TestimonialsAdminPage = lazy(() => import('@/pages/admin/TestimonialsPage'));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));

// Error pages
const NotFoundPage = lazy(() => import('@/pages/error/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/pages/error/UnauthorizedPage'));

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
        path: ROUTE_PATHS.SERVICE_DETAILS.BASE,
        element: <ServiceDetailPage />,
      },
      {
        path: ROUTE_PATHS.CONTACT,
        element: <ContactPage />,
      },
      {
        path: ROUTE_PATHS.TESTIMONIALS,
        element: <TestimonialsPage />,
      },
      {
        path: ROUTE_PATHS.BOOK_APPOINTMENT,
        element: <BookAppointmentPage />,
      },
      {
        path: ROUTE_PATHS.PRIVACY_POLICY,
        element: <PrivacyPolicyPage />,
      },
      {
        path: ROUTE_PATHS.TERMS_OF_SERVICE,
        element: <TermsOfServicePage />,
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
          {
            path: ROUTE_PATHS.AUTH.ADMIN_REQUEST_CONFIRMATION,
            element: <AdminRequestConfirmationPage />,
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
                path: ROUTE_PATHS.ADMIN.PATIENTS,
                element: <PatientsPage />,
              },
              {
                path: ROUTE_PATHS.ADMIN.PATIENT_DETAILS,
                element: <PatientDetailsPage />,
              },
              {
                path: ROUTE_PATHS.ADMIN.APPOINTMENTS,
                element: <AppointmentsPage />,
              },
              {
                path: ROUTE_PATHS.ADMIN.TESTIMONIALS,
                element: <TestimonialsAdminPage />,
              },
              {
                path: ROUTE_PATHS.ADMIN.SETTINGS,
                element: <SettingsPage />,
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

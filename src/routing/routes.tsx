import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTE_PATHS } from './config/routePaths';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
import { LoadingSpinner } from '@/shared/components/ui/Loading/Spinner';

// Lazy load pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    element: <GuestGuard />,
    children: [
      {
        path: ROUTE_PATHS.AUTH.LOGIN,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: ROUTE_PATHS.ADMIN.DASHBOARD,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboardPage />
          </Suspense>
        ),
      },
    ],
  },
]);

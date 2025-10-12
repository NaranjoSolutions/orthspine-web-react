import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { ROUTE_PATHS } from '../config/routePaths';

/**
 * GuestGuard - Chain of Responsibility Pattern
 * Restricts routes to unauthenticated users only (e.g., login, register)
 *
 * Design Principles:
 * - Single Responsibility: Only checks if user is NOT authenticated
 * - Prevents authenticated users from accessing login/register pages
 *
 * Flow:
 * 1. If user is authenticated → Redirect to home
 * 2. Otherwise → Allow access (Outlet)
 *
 * @example
 * ```tsx
 * {
 *   element: <GuestGuard />,
 *   children: [
 *     { path: '/login', element: <LoginPage /> },
 *     { path: '/register', element: <RegisterPage /> }
 *   ]
 * }
 * ```
 */
export const GuestGuard: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return <Outlet />;
};

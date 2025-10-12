import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { ROUTE_PATHS } from '../config/routePaths';

/**
 * AuthGuard - Chain of Responsibility Pattern
 * Protects routes that require authentication
 *
 * Design Principles:
 * - Single Responsibility: Only checks authentication
 * - Open/Closed: Easy to extend with additional checks
 * - Liskov Substitution: Can be replaced with other guard implementations
 *
 * Flow:
 * 1. Check if authentication state is loading → Show spinner
 * 2. Check if user is authenticated → Allow access (Outlet)
 * 3. Otherwise → Redirect to login
 *
 * @example
 * ```tsx
 * {
 *   element: <AuthGuard />,
 *   children: [
 *     { path: '/admin', element: <AdminDashboard /> }
 *   ]
 * }
 * ```
 */
export const AuthGuard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) => state.auth);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" tip="Checking authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};

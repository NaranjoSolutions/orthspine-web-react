import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { ROUTE_PATHS } from '../config/routePaths';
import { UserRole } from '@/features/auth/types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

/**
 * RoleGuard - Chain of Responsibility Pattern
 * Implements Role-Based Access Control (RBAC)
 *
 * Design Principles:
 * - Single Responsibility: Only checks user role permissions
 * - Open/Closed: Easy to add new roles without modification
 * - Dependency Inversion: Depends on UserRole enum (abstraction)
 *
 * Flow:
 * 1. Check if user has one of the allowed roles → Allow access
 * 2. Otherwise → Redirect to unauthorized page
 *
 * @example
 * ```tsx
 * {
 *   element: <RoleGuard allowedRoles={[UserRole.ADMIN]} />,
 *   children: [
 *     { path: '/admin', element: <AdminDashboard /> }
 *   ]
 * }
 * ```
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasPermission = user && allowedRoles.includes(user.role);

  if (!hasPermission) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

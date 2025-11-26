import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/redux/hooks';
import { ROUTE_PATHS } from '../config/routePaths';
import { UserRole } from '@/features/auth/types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasPermission = user && allowedRoles.includes(user.userRole);

  if (!hasPermission) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/redux/hooks';
import { ROUTE_PATHS } from '../config/routePaths';

export const GuestGuard: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect authenticated users to home
  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return <Outlet />;
};

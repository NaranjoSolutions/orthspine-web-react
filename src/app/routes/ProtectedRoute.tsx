import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from './types';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = true; //Replace with actual authentication logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

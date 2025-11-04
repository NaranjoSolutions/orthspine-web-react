import { useNavigate, useLocation } from 'react-router-dom';
import { buildRoute, ROUTE_PATHS } from '../config/routePaths';

/**
 * useNavigation Hook
 *
 * Facade Pattern: Simplifies navigation logic
 * Provides type-safe navigation helpers
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => navigate(ROUTE_PATHS.HOME);
  const goToLogin = (returnUrl?: string) => {
    navigate(ROUTE_PATHS.AUTH.LOGIN, {
      state: { from: returnUrl || location.pathname },
    });
  };
  const goToAdminDashboard = () => navigate(ROUTE_PATHS.ADMIN.DASHBOARD);
  const goBack = () => navigate(-1);

  return {
    goToHome,
    goToLogin,
    goToAdminDashboard,
    goBack,
    navigate,
    location,
    buildRoute,
  };
};

import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './UnauthorizedPage.module.scss';

/**
 * UnauthorizedPage Component
 * Displayed when user tries to access a route they don't have permission for
 *
 * Features:
 * - Clear error message
 * - Navigation back to home
 * - Professional error UI using Ant Design Result
 */
export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className={styles.unauthorizedPage}>
      <Result
        status="403"
        title="403"
        subTitle="Lo sentimos, no está autorizado para acceder a esta página."
        extra={
          <Button type="primary" onClick={handleGoHome}>
            Volver al inicio
          </Button>
        }
      />
    </div>
  );
};

export default UnauthorizedPage;

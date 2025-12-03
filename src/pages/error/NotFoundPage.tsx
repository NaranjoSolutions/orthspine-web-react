import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './NotFoundPage.module.scss';

/**
 * NotFoundPage Component
 * Displayed when user navigates to a route that doesn't exist
 *
 * Features:
 * - Clear 404 error message
 * - Navigation back to home
 * - Professional error UI using Ant Design Result
 */
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className={styles.notFoundPage}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleGoHome}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;

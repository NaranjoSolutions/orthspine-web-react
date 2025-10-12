import { Card } from 'antd';
import { LoginForm } from '@/features/auth/components/login-form';
import styles from './LoginPage.module.scss';

/**
 * LoginPage - Route Handler Component
 * Composite Pattern: Assembles Card + LoginForm
 * Follows Single Responsibility - only handles page composition
 * Note: AuthLayout is applied at the route level in routes.tsx
 */
export const LoginPage: React.FC = () => {
  return (
    <Card className={styles.loginCard} bordered={false}>
      <LoginForm />
    </Card>
  );
};
export default LoginPage;

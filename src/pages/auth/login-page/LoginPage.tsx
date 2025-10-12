import { Card } from 'antd';
import { AuthLayout } from '@/shared/layouts/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import styles from './LoginPage.module.scss';

/**
 * LoginPage - Route Handler Component
 * Composite Pattern: Assembles AuthLayout + Card + LoginForm
 * Follows Single Responsibility - only handles page composition
 */
export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <Card className={styles.loginCard} bordered={false}>
        <LoginForm />
      </Card>
    </AuthLayout>
  );
};
export default LoginPage;

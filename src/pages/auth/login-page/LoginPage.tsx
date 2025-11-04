import { Card } from 'antd';
import { LoginForm } from '@/features/auth/components/login-form';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  return (
    <Card className={styles.loginCard} bordered={false}>
      <LoginForm />
    </Card>
  );
};
export default LoginPage;

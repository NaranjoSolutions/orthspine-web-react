import { Card } from 'antd';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';
import styles from './ForgotPasswordPage.module.scss';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <Card className={styles.forgotPasswordCard} bordered={false}>
      <ForgotPasswordForm />
    </Card>
  );
};
export default ForgotPasswordPage;

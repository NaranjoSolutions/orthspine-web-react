import { Card } from 'antd';
import { RegisterForm } from '@/features/auth/components/register-form';
import styles from './RegisterPage.module.scss';

export const RegisterPage: React.FC = () => {
  return (
    <Card className={styles.registerCard} bordered={false}>
      <RegisterForm />
    </Card>
  );
};
export default RegisterPage;

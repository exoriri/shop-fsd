import { LoginForm } from '@/features/auth/ui/login-form';
import styles from './auth-page.module.scss';
import { Flex } from 'antd';

export const AuthPage = () => {
  return (
    <Flex align="center" justify="center" className={styles.container}>
      <LoginForm />
    </Flex>
  );
};

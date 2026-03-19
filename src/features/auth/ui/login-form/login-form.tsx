import { useState, type ChangeEventHandler } from 'react';
import { Button, Flex, Form, Typography, type CheckboxChangeEvent } from 'antd';
import { Checkbox, Input } from 'antd';

import styles from './login-form.module.scss';
import { useLogin } from '@/features/auth/api/useLogin';

const { Title, Text } = Typography;

interface Fields {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const {
    login,
    isPending: isSigningIn,
    rememberUser,
    setRememberUser,
  } = useLogin();
  const [{ username, password }, setFields] = useState({
    username: '',
    password: '',
  });

  const handleRememberChange = (e: CheckboxChangeEvent) => {
    setRememberUser(e.target.checked);
  };

  const handleLogin = () => {
    login({ username, password });
  };

  const handleInputChange =
    (
      type: keyof Fields,
    ): ChangeEventHandler<HTMLInputElement, HTMLInputElement> =>
    (e) => {
      setFields((prevFields) => ({
        ...prevFields,
        [type]: e.target.value,
      }));
    };

  return (
    <div className={styles.container}>
      <Flex vertical gap={32} className={styles.formWrapper}>
        <div className={styles.text}>
          <Title className={styles.title}>Добро пожаловать!</Title>
          <Text className={styles.text3}>Пожалуйста, авторизируйтесь</Text>
        </div>

        <Form className={styles.form}>
          <Flex vertical className={styles.inputGroup}>
            <label className={styles.label}>Логин</label>
            <Input
              name="username"
              size="large"
              placeholder="Введите логин"
              className={styles.input}
              value={username}
              prefix
              suffix
              onChange={handleInputChange('username')}
            />
          </Flex>
          <Flex vertical className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <Input
              name="password"
              size="large"
              placeholder="Введите логин"
              className={styles.input}
              value={password}
              type="password"
              prefix
              suffix
              onChange={handleInputChange('password')}
            />
          </Flex>

          <Checkbox
            checked={rememberUser}
            className={`${styles.rememberCheckbox} ${rememberUser ? styles.rememberChecked : ''}`}
            onChange={handleRememberChange}
          >
            <p className={styles.rememberText}>Запомнить данные</p>
          </Checkbox>

          <div className={styles.footer}>
            <Button
              className={styles.loginBtn}
              onClick={handleLogin}
              type="primary"
              loading={isSigningIn}
            >
              {!isSigningIn && (
                <Text className={styles.loginBtnText}>Войти</Text>
              )}
            </Button>

            <div className={styles.footerOptionals}>
              <div className={styles.line} />
              <p className={styles.optinalText}>или</p>
              <div className={styles.line} />
            </div>
          </div>
          <div>
            <p>Нет аккаунта?</p>
          </div>
        </Form>
      </Flex>
    </div>
  );
};

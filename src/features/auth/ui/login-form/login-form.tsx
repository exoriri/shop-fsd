import { useState } from 'react';
import {
  Button,
  Flex,
  Form,
  Typography,
  Checkbox,
  type CheckboxChangeEvent,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './login-form.module.scss';
import { useLogin } from '@/features/auth/api/useLogin';

import {
  useLoginValidationSchema,
  type LoginFormValues,
} from '../../model/useLoginValidationSchema';
import { Field } from '@/shared/ui/Field';

import PersonIcon from 'icons/person-icon.svg?react';
import CrossIcon from 'icons/cross-icon.svg?react';
import LockIcon from 'icons/lock-icon.svg?react';
import EyeOffIcon from 'icons/eye-off-icon.svg?react';
import ShadowedLogoIcon from 'icons/shadowed-logo-icon.svg?react';

const { Title, Text } = Typography;

export const LoginForm = () => {
  const {
    login,
    isPending: isSigningIn,
    rememberUser,
    setRememberUser,
  } = useLogin();
  const schema = useLoginValidationSchema();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [passwordType, setPasswordType] = useState<'password' | 'input'>(
    'password',
  );

  const handleRememberChange = (e: CheckboxChangeEvent) => {
    setRememberUser(e.target.checked);
  };

  const handleLogin = () => {
    handleSubmit((credentials) => {
      login(credentials);
    })();
  };

  const toggleShowingPassword = () => {
    setPasswordType((prevType) =>
      prevType === 'password' ? 'input' : 'password',
    );
  };

  return (
    <div className={styles.container}>
      <Flex align='center' vertical className={styles.formWrapper}>
        <ShadowedLogoIcon />
        <Flex vertical gap={32}>
          <div className={styles.text}>
            <Title className={styles.title}>Добро пожаловать!</Title>
            <Text className={styles.text3}>Пожалуйста, авторизируйтесь</Text>
          </div>

          <Form className={styles.form}>
            <Flex gap={16} vertical>
              <Field<LoginFormValues>
                name="username"
                error={errors.username}
                allowClear={{
                  clearIcon: <CrossIcon />,
                }}
                placeholder="Введите логин"
                label="Логин"
                prefix={<PersonIcon />}
                control={control}
              />
              <Field<LoginFormValues>
                name="password"
                error={errors.password}
                suffix={
                  <Button
                    className={styles.eyeButton}
                    onClick={toggleShowingPassword}
                  >
                    {passwordType === 'password' ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeOutlined className={styles.eyeIcon} />
                    )}
                  </Button>
                }
                placeholder="Введите пароль"
                label="Пароль"
                type={passwordType}
                prefix={<LockIcon />}
                control={control}
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
            <Flex justify="center">
              <p className={styles.noAccountText}>
                Нет аккаунта? <a className={styles.createLink}>Создать</a>
              </p>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </div>
  );
};

import { Button, Flex, Typography } from 'antd';

import styles from './login-form.module.scss';

const { Title, Text } = Typography;

export const LoginForm = () => {
  const handleLogin = () => {
    alert('auzi');
  };

  return (
    <div className={styles.container}>
      <Flex vertical gap={32} className={styles.formWrapper}>
        <div className={styles.text}>
          <Title className={styles.title}>Добро пожаловать!</Title>
          <Text className={styles.text3}>Пожалуйста, авторизируйтесь</Text>
        </div>

        <div className={styles.form}>
          <div className={styles.frame5}>
            <div className={styles.frame3}>
              <p className={styles.text4}>Логин</p>
              <div className={styles.input}>
                <div className={styles.usericon}>
                  <div className={styles.ellipse1} />
                  <div className={styles.rectangle1} />
                </div>
                <p className={styles.text5}>test</p>
                <img src="" alt="" />
              </div>
            </div>

            <div className={styles.frame4}>
              <p className={styles.text7}>Пароль</p>
              <div className={styles.input}>
                <img src="" alt="" />
                <p className={styles.text9}>•••••••••••••</p>
                <img src="" alt="" />
              </div>
            </div>
          </div>

          <div className={styles.keep}>
            <img src="" alt="" />
            <p className={styles.rememberText}>Запомнить данные</p>
          </div>

          <div className={styles.footer}>
            <Button
              className={styles.loginBtn}
              onClick={handleLogin}
              type="primary"
            >
              <Text className={styles.loginBtnText}>Войти</Text>
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
        </div>
      </Flex>
    </div>
  );
};

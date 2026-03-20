import { Flex } from 'antd';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <Flex className={styles.container}>
      <h1 className={styles.title}>Товары</h1>
    </Flex>
  );
};

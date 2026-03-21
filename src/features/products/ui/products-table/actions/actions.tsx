import { Button, Flex } from 'antd';
import PlusIcon from 'icons/plus-icon.svg?react';
import DotsThreeCircleIcon from 'icons/dots-three-circle-icon.svg?react';

import styles from './actions.module.scss';

export const Actions = () => {
  return (
    <Flex align="center" gap={32} className={styles.container}>
      <Button className={styles.mainBtn} type="primary">
        <PlusIcon />
      </Button>
      <DotsThreeCircleIcon />
    </Flex>
  );
};

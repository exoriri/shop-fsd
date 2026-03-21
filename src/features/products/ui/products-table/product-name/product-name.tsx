import { Flex, Image } from 'antd';

import styles from './product-name.module.scss';

interface ProductNameProps {
  imageUrl: string;
  name: string;
  category: string;
}

export const ProductName = ({ imageUrl, name, category }: ProductNameProps) => {
  return (
    <Flex align="center" gap={18}>
      <Image src={imageUrl} alt={'image'} preview className={styles.image} />
      <Flex style={{ maxWidth: 210 }} vertical>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{category}</span>
      </Flex>
    </Flex>
  );
};

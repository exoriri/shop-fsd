import { useProducts } from '@/entities/product/api/useProducts';
import { ProductsTable } from '@/features/products/ui/products-table/products-table';
import { Flex, Spin } from 'antd';

import styles from './products-page.module.scss';
import { Header } from '@/features/products/ui/header';

export const ProductsPage = () => {
  const { products, total, loading } = useProducts();

  return (
    <Flex vertical className={styles.pageContainer}>
      <Header />
      {loading ? (
        <Flex flex={1} justify="center" align="center" gap="medium">
          <Spin description={<p>Загрузка...</p>} size="large" />
        </Flex>
      ) : (
        <ProductsTable products={products} itemsAmount={total} />
      )}
    </Flex>
  );
};

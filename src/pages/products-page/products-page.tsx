import { ProductsTable } from '@/features/products/ui/products-table/products-table';
import { Alert, Flex, Spin } from 'antd';

import styles from './products-page.module.scss';
import { Header } from '@/features/products/ui/header';
import { useSearchProducts } from '@/entities/product/api/useSearchProducts';

export const ProductsPage = () => {
  const { products, total, error, loading, refetching } = useSearchProducts();

  return (
    <Flex vertical className={styles.pageContainer}>
      <Header />
      {loading && !refetching ? (
        <Flex flex={1} justify="center" align="center" gap="medium">
          <Spin description={<p>Загрузка...</p>} size="large" />
        </Flex>
      ) : (
        <>
          {!error ? (
            <>
              <ProductsTable
                products={products}
                itemsAmount={total}
                fetching={refetching}
              />
            </>
          ) : (
            <Flex
              className={styles.errorContainer}
              align="center"
              justify="center"
            >
              <Alert
                title="Ошибка"
                description="Перезагрузите страницу или включите/выключите VPN."
                type="error"
                showIcon
              />
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

import { useProducts } from '@/entities/product/api/useProducts';
import { ProductsTable } from '@/features/products/ui/products-table/products-table';
import { Flex, Spin } from 'antd';

export const ProductsPage = () => {
  const { products, loading } = useProducts();

  return (
    <div>
      {loading ? (
        <Flex flex={1} justify="center" align="center" gap="medium">
          <Spin description={<p>Загрузка...</p>} size="large" />
        </Flex>
      ) : (
        <ProductsTable products={products?.products} />
      )}
    </div>
  );
};

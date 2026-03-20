import type { Product } from '@/entities/product/model/types';
import {
  Button,
  Flex,
  Image,
  Table,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import { useMemo, useState } from 'react';

import styles from './products-table.module.scss';
import { useElementHeight } from '../../lib/useElementHeight';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  brand: string;
  name: string;
  sku: string;
  price: number;
  rating: number;
  images: string[];
}

interface ProductsTableProps {
  products: Array<Product> | undefined;
  itemsAmount: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    render: (text, record) => (
      <Flex gap={18}>
        <Image
          src={record.images?.[0]}
          alt={text}
          preview={false}
          style={{
            objectFit: 'contain',
            width: 48,
            height: 48,
            maxWidth: 48,
            maxHeight: 48,
          }}
        />
        <span>{text}</span>
      </Flex>
    ),
  },
  { title: 'Вендор', dataIndex: 'brand' },
  { title: 'Артикул', dataIndex: 'sku' },
  { title: 'Оценка', dataIndex: 'rating' },
  { title: 'Цена, ₽', dataIndex: 'price' },
];

export const ProductsTable = ({
  products,
  itemsAmount,
}: ProductsTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const { ref, height } = useElementHeight();

  const dataSource = useMemo(() => {
    return products?.map(
      ({ id, title, price, sku, rating, brand, images }) => ({
        key: id,
        brand,
        name: title,
        sku,
        price,
        rating,
        images,
      }),
    );
  }, [products]);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    checkStrictly: true,
    onChange: onSelectChange,
    getTitleCheckboxProps: () => ({
      className: styles.checkbox,
    }),
    getCheckboxProps: () => ({
      className: styles.checkbox,
    }),
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="medium" vertical className={styles.container}>
      <Flex align="center" gap="medium">
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Flex style={{ flex: 1, minHeight: 0 }} ref={ref}>
        <Table<DataType>
          rowSelection={rowSelection}
          columns={columns}
          sticky
          dataSource={dataSource ?? []}
          rowClassName={(record) =>
            `${styles.row} ${selectedRowKeys.includes(record.key) ? styles.selectedRow : ''}`
          }
          scroll={{ y: height - 100 }}
          pagination={{
            pageSize: 30,
            total: itemsAmount,
            showSizeChanger: false,
          }}
        />
      </Flex>
    </Flex>
  );
};

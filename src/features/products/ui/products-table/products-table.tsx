import type { Product } from '@/entities/product/model/types';
import {
  Flex,
  Image,
  Table,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import { useMemo, useState } from 'react';

import styles from './products-table.module.scss';
import { useElementHeight } from '../../lib/useElementHeight';
import { TableHeader } from './table-header/';
import { TableFooter } from './table-footer';
import { useProductsStore } from '@/entities/product/store/useProductsStore';
import { AddProductModal } from '../add-product-modal';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  brand: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  rating: number;
  images: string[];
}

interface ProductsTableProps {
  products: Array<Product> | undefined;
  itemsAmount: number;
  fetching: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    width: 315,
    render: (text, record) => (
      <Flex align="center" gap={18}>
        <Image
          src={record.images?.[0]}
          alt={text}
          preview
          className={styles.image}
        />
        <Flex style={{ maxWidth: 210 }} vertical>
          <span className={styles.name}>{record.name}</span>
          <span className={styles.description}>{record.category}</span>
        </Flex>
      </Flex>
    ),
  },
  { title: 'Вендор', dataIndex: 'brand' },
  { title: 'Артикул', dataIndex: 'sku' },
  {
    title: 'Оценка',
    dataIndex: 'rating',
    render: (_, record) => (
      <p>
        <span>{record.rating.toFixed(1)}</span>/5
      </p>
    ),
  },
  { title: 'Цена, ₽', dataIndex: 'price' },
];

export const ProductsTable = ({
  products,
  itemsAmount,
  fetching,
}: ProductsTableProps) => {
  const { currentPage, setCurrentPage } = useProductsStore((state) => state);
  const [adding, setAdding] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { ref, height } = useElementHeight();

  const dataSource = useMemo(() => {
    return products?.map(
      ({ id, title, price, sku, rating, brand, category, images }) => ({
        key: id,
        brand: brand ?? '—',
        name: title,
        category,
        sku,
        price,
        rating,
        images,
      }),
    );
  }, [products]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
  };

  const openModal = () => {
    setAdding(true);
  };
  const closeModal = () => {
    setAdding(false);
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

  return (
    <>
      <Flex gap={40} vertical className={styles.container}>
        <TableHeader onRefresh={handleRefresh} onAdd={openModal} />
        <Flex vertical style={{ flex: 1, minHeight: 0 }} ref={ref}>
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            sticky
            dataSource={dataSource ?? []}
            rowClassName={(record) =>
              `${styles.row} ${selectedRowKeys.includes(record.key) ? styles.selectedRow : ''}`
            }
            scroll={{ y: height - 110, x: 'max-content' }}
            style={{ width: '100%' }}
            pagination={false}
            loading={fetching}
          />
          <TableFooter
            currentPage={currentPage}
            totalAmount={itemsAmount}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
      <AddProductModal open={adding} onClose={closeModal} />
    </>
  );
};

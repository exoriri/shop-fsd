import type { Product, ProductDataType } from '@/entities/product/model/types';
import { Flex, Table, type TableColumnsType, type TableProps } from 'antd';
import { useMemo, useState } from 'react';

import styles from './products-table.module.scss';
import { useElementHeight } from '../../lib/useElementHeight';
import { TableHeader } from './table-header/';
import { TableFooter } from './table-footer';
import {
  useProductsStore,
  type SortType,
} from '@/entities/product/store/useProductsStore';
import { AddProductModal } from '../add-product-modal';
import { ProductName } from './product-name';
import { Rating } from './rating';
import { Brand } from './brand';
import { Actions } from './actions';
import { Price } from './price';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

interface ProductsTableProps {
  products: Array<Product> | undefined;
  itemsAmount: number;
  fetching: boolean;
}

const columns: TableColumnsType<ProductDataType> = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    render: (_text, record) => (
      <ProductName
        imageUrl={record.images[0]}
        name={record.name}
        category={record.category}
      />
    ),
  },
  {
    title: 'Вендор',
    dataIndex: 'brand',
    render: (_text, record) => <Brand title={record.brand} />,
  },
  { title: 'Артикул', dataIndex: 'sku' },
  {
    title: 'Оценка',
    dataIndex: 'rating',
    render: (_text, record) => <Rating rating={record.rating} />,
  },
  {
    title: 'Цена, ₽',
    dataIndex: 'price',
    render: (_text, record) => <Price value={record.price} />,
  },
  {
    title: '',
    key: 'action',
    render: () => <Actions />,
  },
];

export const ProductsTable = ({
  products,
  itemsAmount,
  fetching,
}: ProductsTableProps) => {
  const { currentPage, sort, setCurrentPage, setSort } = useProductsStore(
    (state) => state,
  );
  const [adding, setAdding] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { ref, height } = useElementHeight();

  const dataSource = useMemo(() => {
    return products?.map(
      ({ id, title, price, sku, rating, brand, category, images }) => ({
        key: id,
        brand: brand,
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    setSort('lowPrice');
    setCurrentPage(1);
  };

  const openModal = () => {
    setAdding(true);
  };
  const closeModal = () => {
    setAdding(false);
  };

  const handleSortChange = (type: SortType) => () => {
    setSort(type);
  };

  const rowSelection: TableRowSelection<ProductDataType> = {
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
        <TableHeader
          onRefresh={handleRefresh}
          onAdd={openModal}
          onSortChange={handleSortChange}
        />
        <Flex vertical style={{ flex: 1, minHeight: 0 }} ref={ref}>
          <Table<ProductDataType>
            rowSelection={rowSelection}
            columns={columns}
            sticky
            dataSource={dataSource ? [...dataSource].sort(sort) : []}
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

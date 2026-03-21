import { Button, Pagination, Row } from 'antd';
import { LIMIT } from '@/entities/product/api/useSearchProducts';

import styles from './table-footer.module.scss';
import type { ReactNode } from 'react';

interface TableFooterProps {
  totalAmount: number;
  currentPage: number;
  onChange: (page: number, pageSize: number) => void;
}

export const TableFooter = ({
  totalAmount,
  currentPage,
  onChange,
}: TableFooterProps) => {
  const startRange = (currentPage - 1) * LIMIT + 1;
  const endRange =
    currentPage * LIMIT > totalAmount ? totalAmount : currentPage * LIMIT;

  if (totalAmount <= 0) return null;

  const renderPageButton = (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: ReactNode,
  ) => {
    const activeButtonClassName =
      page === currentPage ? styles.activePageButton : '';
      
    if (type === 'page') {
      return (
        <Button className={`${styles.pageButton} ${activeButtonClassName}`}>
          {page}
        </Button>
      );
    }
    return originalElement;
  };

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{ marginTop: 20, padding: '16px 0' }}
    >
      <p className={styles.shownText}>
        Показано{' '}
        <span className={styles.shownNumber}>
          {startRange}-{endRange}
        </span>{' '}
        из
        <span className={styles.shownNumber}>{` ${totalAmount}`}</span>
      </p>
      <Pagination
        current={currentPage}
        pageSize={LIMIT}
        total={totalAmount}
        onChange={onChange}
        showSizeChanger={false}
        itemRender={renderPageButton}
      />
    </Row>
  );
};

import { Button, Dropdown, Flex, type MenuProps } from 'antd';
import PlusCircleIcon from 'icons/plus-circle-icon.svg?react';
import ArrowClockwiseIcon from 'icons/arrows-clockwise-icon.svg?react';
import SortIcon from 'icons/sort-icon.svg?react';

import styles from './table-header.module.scss';
import type { SortType } from '@/entities/product/store/useProductsStore';

interface TableHeaderProps {
  onRefresh: () => void;
  onAdd: () => void;
  onSortChange: (sortType: SortType) => () => void;
}

export const TableHeader = ({
  onAdd,
  onRefresh,
  onSortChange,
}: TableHeaderProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Сначала дешевые',
      onClick: onSortChange('lowPrice'),
    },
    {
      key: '2',
      label: 'Сначала дорогие',
      onClick: onSortChange('highPrice'),
    },
    {
      key: '3',
      label: 'Сначала с высокой оценкой',
      onClick: onSortChange('highRating'),
    },
    {
      key: '4',
      label: 'Сначала с низкой оценкой',
      onClick: onSortChange('lowRating'),
    },
  ];
  return (
    <Flex align="center" justify="space-between">
      <h3 className={styles.tableTitle}>Все позиции</h3>
      <Flex align="center" gap={8}>
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ['1'],
          }}
        >
          <Button className={styles.iconButton}>
            <div className={styles.iconWrapper}>
              <SortIcon />
            </div>
          </Button>
        </Dropdown>
        <Button className={styles.iconButton} onClick={onRefresh}>
          <div className={styles.iconWrapper}>
            <ArrowClockwiseIcon />
          </div>
        </Button>
        <Button className={styles.addButton} type="primary" onClick={onAdd}>
          <PlusCircleIcon />
          <span>Добавить</span>
        </Button>
      </Flex>
    </Flex>
  );
};

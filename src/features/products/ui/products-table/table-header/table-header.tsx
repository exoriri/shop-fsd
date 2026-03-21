import { Button, Flex } from 'antd';
import PlusCircleIcon from 'icons/plus-circle-icon.svg?react';
import ArrowClockwiseIcon from 'icons/arrows-clockwise-icon.svg?react';
import styles from './table-header.module.scss';

interface TableHeaderProps {
  onRefresh: () => void;
  onAdd: () => void;
}

export const TableHeader = ({ onAdd, onRefresh }: TableHeaderProps) => {
  return (
    <Flex align="center" justify="space-between">
      <h3 className={styles.tableTitle}>Все позиции</h3>
      <Flex align="center" gap={8}>
        <Button className={styles.refreshButton} onClick={onRefresh}>
          <div className={styles.refreshIconWrapper}>
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

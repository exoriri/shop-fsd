import type { ChangeEventHandler } from 'react';
import { Flex, Input } from 'antd';

import SearchIcon from 'icons/search-icon.svg?react';

import styles from './header.module.scss';
import { useProductsStore } from '@/entities/product/store/useProductsStore';
import { debounce } from '@/shared/utils/debounce';
import CrossIcon from 'icons/cross-icon.svg?react';

export const Header = () => {
  const { setSearchText, setCurrentPage } = useProductsStore((state) => state);

  const handleSearch: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    e,
  ) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Flex className={styles.container}>
      <h1 className={styles.title}>Товары</h1>
      <Flex justify="center" flex={1}>
        <Input
          placeholder="Найти"
          className={styles.searchField}
          prefix={<SearchIcon />}
          allowClear={{
            clearIcon: <CrossIcon />,
          }}
          onChange={debounce(handleSearch)}
        />
      </Flex>
    </Flex>
  );
};

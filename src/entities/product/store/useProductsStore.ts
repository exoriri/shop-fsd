import { create } from 'zustand';
import type { ProductDataType } from '../model/types';

export const sorting = {
  lowPrice: (a: ProductDataType, b: ProductDataType) => a.price - b.price,
  highPrice: (a: ProductDataType, b: ProductDataType) => b.price - a.price,
  highRating: (a: ProductDataType, b: ProductDataType) => b.rating - a.rating,
  lowRating: (a: ProductDataType, b: ProductDataType) => a.rating - b.rating,
};

export type SortType = keyof typeof sorting;

export interface ProductsStore {
  searchText: string;
  currentPage: number;
  sort: (typeof sorting)[SortType];
  setSort: (type: SortType) => void;
  setSearchText: (text: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useProductsStore = create<ProductsStore>()((set) => ({
  searchText: '',
  currentPage: 1,
  sort: sorting['lowPrice'],
  setSort: (sortType) => {
    set({ sort: sorting[sortType] });
  },
  setSearchText: (text) => {
    set({ searchText: text });
  },
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
}));

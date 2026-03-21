import { create } from 'zustand';

export interface ProductsStore {
  searchText: string;
  currentPage: number;
  setSearchText: (text: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useProductsStore = create<ProductsStore>()((set) => ({
  searchText: '',
  currentPage: 1,
  setSearchText: (text) => {
    set({ searchText: text });
  },
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
}));

import { apiClient } from '@/shared/api';
import type { ApiError } from '@/shared/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useProductsStore } from '../store/useProductsStore';
import type { Product } from '../model/types';

interface SearchProductsParams {
  limit: number;
  skip: number;
  searchText: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const LIMIT = 30;

const searchProducts = async ({
  searchText,
  limit,
  skip,
}: SearchProductsParams) => {
  try {
    const response = await apiClient.get<ProductsResponse>(
      decodeURI(`/products/search?q=${searchText}&limit=${limit}&skip=${skip}`),
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    throw new Error(error?.response?.data.message);
  }
};

enum QueryKeys {
  FoundProducts = 'found-products',
}

export const useSearchProducts = () => {
  const { currentPage, searchText } = useProductsStore((state) => state);
  const { data, error, isPending, isFetching } = useQuery({
    queryKey: [QueryKeys.FoundProducts, searchText, currentPage],
    retry: false,
    queryFn: () =>
      searchProducts({ searchText, limit: LIMIT, skip: currentPage - 1 }),
    placeholderData: (prevData) => prevData,
  });

  return {
    products: data?.products,
    total: data ? data.total : 0,
    loading: isPending,
    refetching: isFetching,
    error,
  };
};

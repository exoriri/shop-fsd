import { apiClient } from '@/shared/api';
import type { ApiError } from '@/shared/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Product } from '../model/types';

interface GepProductsParams {
  limit: number;
  skip: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const LIMIT = 30;

const getProducts = async ({ limit, skip }: GepProductsParams) => {
  try {
    const response = await apiClient.get<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    throw new Error(error?.response?.data.message);
  }
};

enum QueryKeys {
  Products = 'products',
}

export const useProducts = () => {
  const { data, refetch, isPending } = useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: (queryKey) => {
      //   const [_] = queryKey;
      return getProducts({ limit: LIMIT, skip: 0 });
    },
  });

  return {
    products: data?.products,
    total: data ? data.total : 0,
    loading: isPending,
  };
};

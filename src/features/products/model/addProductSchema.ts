import z from 'zod';
import { EMPTY_ERROR_MESSAGE } from '@/shared/constants';

const NUMBER_TYPE_ERROR = 'Тут должно быть число';

export const addProductSchema = z.object({
  name: z.string().min(1, EMPTY_ERROR_MESSAGE),
  vendor: z.string().min(1, EMPTY_ERROR_MESSAGE),
  sku: z.string().min(1, EMPTY_ERROR_MESSAGE),
  rating: z.coerce.number({ error: NUMBER_TYPE_ERROR }).min(1, EMPTY_ERROR_MESSAGE),
  price: z.coerce.number({ error: NUMBER_TYPE_ERROR }).min(1, EMPTY_ERROR_MESSAGE),
});

export const ADD_PRODUCT_DEFAULT_VALUES = {
  name: '',
  vendor: '',
  sku: '',
  rating: '',
  price: '',
};

export type AddProductValues = z.input<typeof addProductSchema>;

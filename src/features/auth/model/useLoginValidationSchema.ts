import { z } from 'zod';
import { EMPTY_ERROR_MESSAGE } from '@/shared/constants';

const schema = z.object({
  username: z.string().min(1, EMPTY_ERROR_MESSAGE),
  password: z.string().min(1, EMPTY_ERROR_MESSAGE),
});

export const useLoginValidationSchema = () => schema;

export type LoginFormValues = z.infer<typeof schema>;

import { z } from 'zod';

const EMPTY_ERROR_MESSAGE = 'Поле не должно быть пустым';

const schema = z.object({
  username: z.string().min(1, EMPTY_ERROR_MESSAGE),
  password: z.string().min(1, EMPTY_ERROR_MESSAGE),
});

export const useLoginValidationSchema = () => schema;

export type LoginFormValues = z.infer<typeof schema>;

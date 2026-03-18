import { apiClient } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials) =>
  await apiClient.post('/auth/login', {
    data: credentials,
  });

export const useLogin = () => {};

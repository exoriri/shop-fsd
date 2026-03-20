import { notification } from 'antd';
import type { AxiosError } from 'axios';
import { apiClient } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import type { ApiError } from '@/shared/api/apiClient';

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

const login = async (credentials: Credentials) => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    throw new Error(error?.response?.data.message);
  }
};

export const useLogin = () => {
  const { rememberUser, setTokens, setUser, setRememberUser } = useAuthStore(
    (state) => state,
  );
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
    onSuccess: (response) => {
      const {
        accessToken,
        refreshToken,
        id,
        username,
        email,
        firstName,
        lastName,
        gender,
        image,
      } = response;
      setTokens(accessToken, refreshToken);
      setUser({ id, username, email, firstName, lastName, gender, image });
    },
  });

  return {
    isPending,
    error,
    rememberUser,
    login: mutate,
    setRememberUser,
  };
};

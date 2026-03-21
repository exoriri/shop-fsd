import axios from 'axios';
import { AUTH_STORAGE_NAME } from '../constants';
import type { Tokens } from '../types';
import { notification } from 'antd';

export interface ApiError {
  message?: string;
}

const REQUEST_TIMEOUT = 40 * 1000;

const apiClient = axios.create({
  baseURL: process.env.PUBLIC_BASE_URL || import.meta.env.PUBLIC_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

apiClient.interceptors.request.use((config) => {
  const authStorageStringified = localStorage.getItem(AUTH_STORAGE_NAME);
  const {
    state: { accessToken },
  } = (
    authStorageStringified
      ? JSON.parse(authStorageStringified)
      : { accessToken: null, refreshToken: null }
  ) as { state: Tokens; version: number };
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_NAME);
      window.location.href = '/login';
      notification.error({
        message: 'Нужно авторизоваться',
        description: 'Вы не заходили более часа',
      });
    }
    return Promise.reject(error);
  },
);

export default apiClient;

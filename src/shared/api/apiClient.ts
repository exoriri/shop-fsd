import axios from 'axios';
import { AUTH_STORAGE_NAME } from '../constants';
import type { Tokens } from '../types';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const authStorageStringified = localStorage.getItem(AUTH_STORAGE_NAME);
  const { accessToken } = (
    authStorageStringified
      ? JSON.parse(authStorageStringified)
      : { accessToken: null, refreshToken: null }
  ) as Tokens;

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
    }
    return Promise.reject(error);
  },
);

export default apiClient;

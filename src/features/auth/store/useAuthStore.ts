import { AUTH_STORAGE_NAME } from '@/shared/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  rememberUser: boolean;
  setRememberUser: (remember: boolean) => void;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  resetAuthStore: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      rememberUser: false,
      setRememberUser: (remember) => {
        set({ rememberUser: remember });
      },
      setUser: (user) => {
        set({ user });
      },
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },
      resetAuthStore: () => {
        set({ user: null, accessToken: null, refreshToken: null, rememberUser: false });
      },
    }),
    {
      name: AUTH_STORAGE_NAME,
      partialize: ({ accessToken, refreshToken, rememberUser }) => {
        if (rememberUser) {
          return {
            accessToken,
            refreshToken,
          };
        }
        return;
      },
    },
  ),
);

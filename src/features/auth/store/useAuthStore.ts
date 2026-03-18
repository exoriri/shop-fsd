import type { AuthStore } from '@/shared/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    }),
    {
      name: 'auth-storage',
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

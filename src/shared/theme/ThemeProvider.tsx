import { ConfigProvider } from 'antd';
import type { PropsWithChildren } from 'react';
import { colors } from './colors';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

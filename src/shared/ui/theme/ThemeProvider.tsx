import { ConfigProvider } from 'antd';
import type { PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#242EDB',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Flex, Spin } from 'antd';

export const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  if (!accessToken && !refreshToken) {
    return (
      <Flex justify='center' align="center" gap="medium">
        <Spin description={<p>Загрузка...</p>} size="large" />
      </Flex>
    );
  }

  return <Outlet />;
};

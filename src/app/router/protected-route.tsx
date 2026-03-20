import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './constants';

export const PublicRoute = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);

  if (refreshToken) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <Outlet />;
};

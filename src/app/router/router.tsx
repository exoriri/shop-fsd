import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { ROUTES } from './constants';
import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from '@/pages';
import { PublicRoute } from './public-route';
import { ProtectedRoute } from './protected-route';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: ROUTES.login, Component: AuthPage }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.home, Component: () => <div>asjkfdlkasjdkflsjfsk</div> },
    ],
  },
]);

export const RouterProvider = () => <ReactRouterProvider router={router} />;

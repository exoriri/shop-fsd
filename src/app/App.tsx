
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { RouterProvider } from './router';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './app.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

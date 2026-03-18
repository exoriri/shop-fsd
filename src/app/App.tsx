import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { RouterProvider } from './router';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './app.css';

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
};

export default App;

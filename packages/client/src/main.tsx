import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import '../index.css';
import router from './constants/router';
import { store } from './store/store';
import { ThemeProvider } from './templates/ThemeProvider/ThemeProvider';

hydrate(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors closeButton visibleToasts={1} duration={2000} />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement
);

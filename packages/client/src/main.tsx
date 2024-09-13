import '../index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './constants/router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster richColors closeButton visibleToasts={1} duration={2000} />
  </Provider>
);

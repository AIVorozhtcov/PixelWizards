import '../index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './constants/router';
import startServiceWorker from './startServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner';
import { Theme } from './templates/ThemeContext/ThemeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Theme>
      <RouterProvider router={router} />
      <Toaster richColors closeButton visibleToasts={1} duration={2000} />
    </Theme>
  </Provider>
);

startServiceWorker();

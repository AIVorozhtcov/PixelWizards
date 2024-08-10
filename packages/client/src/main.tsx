import '../index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './constants/router';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);

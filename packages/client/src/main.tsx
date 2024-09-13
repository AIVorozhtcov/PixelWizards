import '../index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './constants/router';
import startServiceWorker from './startServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner';
import App from './App';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <App />
  </Provider>
);

//startServiceWorker();

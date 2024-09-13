import ReactDOM from 'react-dom/server';
import '../index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { fetchUserThunk } from './store/slices/user';
import { reducer } from './store/store';

export const render = async () => {
  const store = configureStore({
    reducer,
  });

  const userState = fetchUserThunk();
  await store.dispatch(userState);
  const initialState = store.getState();

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    initialState: initialState,
  };
};

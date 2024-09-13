import ReactDOM from 'react-dom/server';
import '../index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { fetchUserThunk } from './store/slices/user';
import { reducer } from './store/store';
import { createFetchRequest } from './entry-server.utils';
import { Request as ExpressRequest } from 'express';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { routes } from './constants/routes';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }
  const store = configureStore({
    reducer,
  });
  await store.dispatch(fetchUserThunk());
  const router = createStaticRouter(dataRoutes, context);
  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  };
};

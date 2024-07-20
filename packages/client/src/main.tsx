import '../index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Game from './pages/Game';
import Profile from './pages/Profile';
import LeaderBoard from './pages/LeaderBoard';
import Forum from './pages/Forum';
import Topic from './pages/Topic';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/leaderboard',
    element: <LeaderBoard />,
  },
  {
    path: '/forum',
    element: <Forum />,
  },
  {
    path: '/topic/:id',
    element: <Topic />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

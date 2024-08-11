import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from '../templates/Layout/ProtectedLayout';
import UnprotectedLayout from '../templates/Layout/UnprotectedLayout';
import LINKS from './links';

const NotFound = lazy(() => import('../pages/NotFound'));
const Home = lazy(() => import('../pages/Home'));
const Forum = lazy(() => import('../pages/Forum'));
const Game = lazy(() => import('../pages/Game'));
const LeaderBoard = lazy(() => import('../pages/LeaderBoard'));
const Login = lazy(() => import('../pages/Login'));
const Profile = lazy(() => import('../pages/Profile'));
const Registration = lazy(() => import('../pages/Registration'));
const Topic = lazy(() => import('../pages/Topic'));
const ServerErrorPage = lazy(() => import('../pages/505'));

const router = createBrowserRouter([
  {
    element: <ProtectedLayout />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        path: LINKS.home,
        element: <Home />,
      },
      {
        path: LINKS.profile,
        element: <Profile />,
      },
      {
        path: LINKS.notfound,
        element: <NotFound />,
      },
      {
        path: LINKS.home,
        element: <Home />,
      },

      {
        path: LINKS.game,
        element: <Game />,
      },
      {
        path: LINKS.profile,
        element: <Profile />,
      },
      {
        path: LINKS.leaderboard,
        element: <LeaderBoard />,
      },
      {
        path: LINKS.forum,
        element: <Forum />,
      },
      {
        path: LINKS.topic,
        element: <Topic />,
      },
    ],
  },
  {
    element: <UnprotectedLayout />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        path: LINKS.login,
        element: <Login />,
      },
      {
        path: LINKS.registration,
        element: <Registration />,
      },
    ],
  },
]);

export default router;

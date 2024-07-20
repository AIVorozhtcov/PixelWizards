import { createBrowserRouter } from 'react-router-dom';
import Forum from '../pages/Forum';
import Game from '../pages/Game';
import Home from '../pages/Home';
import LeaderBoard from '../pages/LeaderBoard';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';
import Topic from '../pages/Topic';

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

export default router;

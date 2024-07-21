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
import links from './links';

const router = createBrowserRouter([
  {
    path: links.notfound,
    element: <NotFound />,
  },
  {
    path: links.home,
    element: <Home />,
  },
  {
    path: links.login,
    element: <Login />,
  },
  {
    path: links.registration,
    element: <Registration />,
  },
  {
    path: links.game,
    element: <Game />,
  },
  {
    path: links.profile,
    element: <Profile />,
  },
  {
    path: links.leaderboard,
    element: <LeaderBoard />,
  },
  {
    path: links.forum,
    element: <Forum />,
  },
  {
    path: links.topic,
    element: <Topic />,
  },
]);

export default router;

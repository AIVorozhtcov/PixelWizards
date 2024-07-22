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
import LINKS from './links';

const router = createBrowserRouter([
  {
    path: LINKS.notfound,
    element: <NotFound />,
  },
  {
    path: LINKS.home,
    element: <Home />,
  },
  {
    path: LINKS.login,
    element: <Login />,
  },
  {
    path: LINKS.registration,
    element: <Registration />,
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
]);

export default router;

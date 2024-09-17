import ProtectedLayout from '../templates/Layout/ProtectedLayout';
import UnprotectedLayout from '../templates/Layout/UnprotectedLayout';
import LINKS from './links';
import Test from '../__test__/Test';
import ServerErrorPage from '../pages/505';
import Forum from '../pages/Forum';
import Game from '../pages/Game';
import Home from '../pages/Home';
import LeaderBoard from '../pages/LeaderBoard';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';
import ForumTopic from '../pages/ForumTopic';

export const routes = [
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
        path: LINKS.forumTopic,
        element: <ForumTopic />,
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
      {
        path: LINKS.test,
        element: <Test />,
      },
    ],
  },
];

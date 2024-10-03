import Test from '../__test__/Test';
import ServerErrorPage from '../pages/505';
import Forum from '../pages/Forum';
import ForumLogin from '../pages/ForumLogin';
import ForumRegistration from '../pages/ForumRegistration';
import ForumTopic from '../pages/ForumTopic';
import Game from '../pages/Game';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';
import ProtectedLayout from '../templates/Layout/ProtectedLayout';
import UnprotectedLayout from '../templates/Layout/UnprotectedLayout';
import LINKS from './links';

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
      {
        path: LINKS.forum,
        element: <Forum />,
      },
      {
        path: LINKS.forumTopic,
        element: <ForumTopic />,
      },
      {
        path: LINKS.forumLogin,
        element: <ForumLogin />,
      },
      {
        path: LINKS.forumRegistration,
        element: <ForumRegistration />,
      },
    ],
  },
];

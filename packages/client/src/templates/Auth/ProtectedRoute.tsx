import { Outlet } from 'react-router-dom';
import { checkAuth } from '../../lib/hooks';

export default function ProtectedRoute() {
  checkAuth();

  return <Outlet />;
}

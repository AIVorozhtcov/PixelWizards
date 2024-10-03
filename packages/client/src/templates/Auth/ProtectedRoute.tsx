import { Outlet } from 'react-router-dom';
import { useCheckAuth } from '../../lib/hooks';

export default function ProtectedRoute() {
  useCheckAuth();

  return <Outlet />;
}

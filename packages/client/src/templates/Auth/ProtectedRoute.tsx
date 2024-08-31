import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { checkAuth } from '../../lib/hooks';
import Loader from '../Loader';

export default function ProtectedRoute() {
  checkAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}

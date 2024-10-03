import { Outlet } from 'react-router-dom';
import { checkAuth } from '../../lib/hooks';
import { Suspense } from 'react';

export default function ProtectedRoute() {
  checkAuth();

  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}

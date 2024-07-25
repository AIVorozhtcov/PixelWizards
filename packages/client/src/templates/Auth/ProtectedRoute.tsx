import { Suspense } from 'react';
import { useAuth } from '.';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../Loader';

export default function ProtectedRoute() {
  const userInfo = useAuth();

  if (!userInfo?.user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}

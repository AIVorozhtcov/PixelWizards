import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader';

export default function UnprotectedLayout() {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}

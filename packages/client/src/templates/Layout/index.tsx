import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import Loader from '../Loader';

export default function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

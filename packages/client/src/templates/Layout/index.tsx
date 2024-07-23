import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import Loader from '../Loader';
import AuthProvider from '../Auth';

export default function Layout() {
  return (
    <AuthProvider>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
}

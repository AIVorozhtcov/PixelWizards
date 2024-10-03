import { Outlet } from 'react-router-dom';
import ErrorBoundaryDefault from '../ErrorBoundary';
import { Suspense } from 'react';

export default function UnprotectedLayout() {
  return (
    <ErrorBoundaryDefault>
      <Outlet />
    </ErrorBoundaryDefault>
  );
}

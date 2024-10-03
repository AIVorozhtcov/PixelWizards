import { Outlet } from 'react-router-dom';
import ErrorBoundaryDefault from '../ErrorBoundary';

export default function UnprotectedLayout() {
  return (
    <ErrorBoundaryDefault>
      <Outlet />
    </ErrorBoundaryDefault>
  );
}

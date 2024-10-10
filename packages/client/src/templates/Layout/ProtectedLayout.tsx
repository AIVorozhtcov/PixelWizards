import Header from '../../components/organisms/Header';
import ProtectedRoute from '../Auth/ProtectedRoute';
import ErrorBoundaryDefault from '../ErrorBoundary';

export default function Layout() {
  return (
    <ErrorBoundaryDefault>
      <Header />
      <ProtectedRoute />
    </ErrorBoundaryDefault>
  );
}

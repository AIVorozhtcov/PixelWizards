import Header from '../../components/organisms/Header';
import AuthProvider from '../Auth';
import ProtectedRoute from '../Auth/ProtectedRoute';

export default function Layout() {
  return (
    <AuthProvider>
      <Header />
      <ProtectedRoute />
    </AuthProvider>
  );
}

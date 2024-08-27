import Header from '../../components/organisms/Header';
import ProtectedRoute from '../Auth/ProtectedRoute';

export default function Layout() {
  return (
    <>
      <Header />
      <ProtectedRoute />
    </>
  );
}

import { useLocation } from 'react-router-dom';
import arrayOfLinks from '../../constants/arrayOfLinks';
import Link from '../atoms/Link';
import Button from '../atoms/Button';
import { useAuth } from '../../templates/Auth';

export default function Navbar() {
  const { pathname } = useLocation();
  const userInfo = useAuth();
  return (
    <nav className="ml-auto flex gap-4 items-center sm:gap-6">
      {arrayOfLinks.map(link => (
        <Link key={link.href} to={link.href} isActive={pathname === link.href}>
          {link.name}
        </Link>
      ))}
      <Button variant="acent" onClick={() => userInfo?.setUser(null)}>
        Выйти из профиля
      </Button>
    </nav>
  );
}

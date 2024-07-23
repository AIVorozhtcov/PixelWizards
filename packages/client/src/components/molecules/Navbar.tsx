import { useLocation } from 'react-router-dom';
import arrayOfLinks from '../../constants/arrayOfLinks';
import Link from '../atoms/Link';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      {arrayOfLinks.map(link => (
        <Link key={link.href} to={link.href} isActive={pathname === link.href}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

import arrayOfLinks from '../../constants/arrayOfLinks';
import Link from '../atoms/Link';

export default function Navbar() {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      {arrayOfLinks.map(link => (
        <Link key={link.href} to={link.href}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

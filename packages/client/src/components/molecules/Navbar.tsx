import { useLocation, useNavigate } from 'react-router-dom';
import arrayOfLinks from '../../constants/arrayOfLinks';
import Link from '../atoms/Link';
import Button from '../atoms/Button';
import generalAPI from '../../api/fetchTransport/generalApi';
import { toast } from 'sonner';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="ml-auto flex gap-4 items-center sm:gap-6">
      {arrayOfLinks.map(link => (
        <Link key={link.href} to={link.href} isActive={pathname === link.href}>
          {link.name}
        </Link>
      ))}
      <Button
        variant="acent"
        onClick={async () => {
          toast.info('Выходим из системы');
          await generalAPI.logout().catch(error => {
            toast.error('Не удалось выйти из системы, из-за ' + error.message);
          });
          navigate('/login');
        }}>
        Выйти из профиля
      </Button>
    </nav>
  );
}

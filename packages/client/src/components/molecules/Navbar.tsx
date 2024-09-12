import { useLocation, useNavigate } from 'react-router-dom';
import arrayOfLinks from '../../constants/arrayOfLinks';
import Link from '../atoms/Link';
import Button from '../atoms/Button';
import generalAPI from '../../api/fetchTransport/generalApi';
import { toast } from 'sonner';
import ThemeButton from './ThemeButton';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="ml-auto flex gap-4 items-center sm:gap-6">
      {arrayOfLinks.map(link => (
        <Link
          key={link.href}
          to={link.href}
          isActive={pathname === link.href}
          className={
            pathname === link.href
              ? 'dark:text-[#ffc107] text-red-700'
              : 'dark:text-white text-[#0c1b2a]'
          }>
          {link.name}
        </Link>
      ))}
      <Button
        variant="acent"
        className="dark:text-white text-[#0c1b2a]"
        onClick={async () => {
          toast.info('Выходим из системы');
          await generalAPI.logout().catch(error => {
            toast.error('Не удалось выйти из системы, из-за ' + error.message);
          });
          navigate('/login');
        }}>
        Выйти из профиля
      </Button>
      <ThemeButton />
    </nav>
  );
}

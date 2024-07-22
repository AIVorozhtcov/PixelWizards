import Link from '../atoms/Link';
import RocketIcon from '../atoms/icon/RocketIcon';
import Navbar from '../molecules/Navbar';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" variant="withIcon">
        <RocketIcon className="size-6 text-[#ffc107]" />
        <span className="sr-only">Capybara Crusaders</span>
      </Link>
      <Navbar />
    </header>
  );
}

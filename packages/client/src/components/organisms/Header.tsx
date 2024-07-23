import Link from '../atoms/Link';
import RocketIcon from '../atoms/icon/RocketIcon';
import Navbar from '../molecules/Navbar';

export default function Header() {
  return (
    <header className="sticky top-0 px-4 lg:px-6 h-14 flex items-center bg-[#0c1b2a]">
      <Link to="/" variant="withIcon">
        <RocketIcon className="size-6 text-[#ffc107]" />
        <span className="text-white">Capybara Crusaders</span>
      </Link>
      <Navbar />
    </header>
  );
}

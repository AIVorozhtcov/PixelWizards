import LINKS from '../../constants/links';
import Link from '../atoms/Link';
import RocketIcon from '../atoms/icon/RocketIcon';
import Navbar from '../molecules/Navbar';

export default function Header() {
  return (
    <header className="sticky z-30 top-0 px-4 lg:px-6 h-14 flex items-center dark:bg-[#0c1b2a] bg-[#ffbf00]">
      <Link to={LINKS.home} variant="withIcon">
        <RocketIcon className="size-6 dark:text-[#ffc107] text-red-800" />
        <span className="dark:text-white text-[#0c1b2a] ml-2">
          Capybara Crusaders
        </span>
      </Link>
      <Navbar />
    </header>
  );
}

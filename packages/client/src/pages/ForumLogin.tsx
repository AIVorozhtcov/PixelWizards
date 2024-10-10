import RocketIcon from '../components/atoms/icon/RocketIcon';
import MainSection from '../components/atoms/MainSection';
import ThemeButton from '../components/molecules/ThemeButton';
import ForumLoginSection from '../components/organisms/ForumLoginSection';
import LINKS from '../constants/links';
import Link from '../components/atoms/Link';

export default function ForumLogin() {
  return (
    <>
      <header className="sticky z-30 top-0 px-4 lg:px-6 h-14 flex items-center justify-between dark:bg-[#0c1b2a] bg-[#ffbf00]">
        <Link to={LINKS.home} variant="withIcon">
          <RocketIcon className="size-6 dark:text-[#ffc107] text-red-800" />
          <span className="dark:text-white text-[#0c1b2a] ml-2">
            Capybara Crusaders
          </span>
        </Link>
        <ThemeButton />
      </header>

      <MainSection className="items-center justify-start relative">
        <ForumLoginSection />
      </MainSection>
    </>
  );
}

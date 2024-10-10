import Link from '../components/atoms/Link';
import MainSection from '../components/atoms/MainSection';
import Title from '../components/atoms/Title';
import LINKS from '../constants/links';

export default function NotFound() {
  return (
    <MainSection>
      <Title>Упс, такой страницы нет</Title>
      <img
        src="/heroImage.webp"
        width="550"
        height="550"
        alt="Космическая битва"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
      />
      <Link to={LINKS.home} variant="acent">
        На главную
      </Link>
    </MainSection>
  );
}

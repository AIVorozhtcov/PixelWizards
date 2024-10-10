import { useRouteError } from 'react-router-dom';
import Link from '../components/atoms/Link';
import Title from '../components/atoms/Title';
import LINKS from '../constants/links';

export default function ServerErrorPage() {
  const error = useRouteError();
  return (
    <main className="flex flex-col min-h-dvh bg-[#0c1b2a]">
      <Title>
        Упс, ошибка на сервере: <i>{error.statusText || error.message}</i>
      </Title>
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
    </main>
  );
}

import { useRouteError } from 'react-router-dom';
import Link from '../components/atoms/Link';
import Title from '../components/atoms/Title';
import LINKS from '../constants/links';
import MainSection from '../components/atoms/MainSection';

type ErrorResponse = {
  statusText?: string;
  message?: string;
};

export default function ServerErrorPage() {
  const error = useRouteError();
  return (
    <MainSection>
      <Title>
        Упс, ошибка на сервере:{' '}
        <i>
          {(error as ErrorResponse).statusText ||
            (error as ErrorResponse).message}
        </i>
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
    </MainSection>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import forumApi from '../api/fetchTransport/forumApi';
import Button from '../components/atoms/Button';
import MainSection from '../components/atoms/MainSection';
import ForumCreate from '../components/molecules/ForumCreate';
import ForumTopic from '../components/molecules/ForumTopic';
import ThemeButton from '../components/molecules/ThemeButton';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { selectUserForum, setUserForum } from '../store/slices/userForum';
import { TopicArray } from '../types/validationSchemas';
import RocketIcon from '../components/atoms/icon/RocketIcon';
import LINKS from '../constants/links';
import Link from '../components/atoms/Link';

export default function Forum() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicArray[]>([]);
  const userId = useAppSelector(selectUserForum);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await forumApi.getUser();

        if (!user) throw new Error('Не удалось найти пользователя');

        dispatch(setUserForum({ userForum: user }));

        const topics = await forumApi.getTopics();

        if ('reason' in topics) {
          throw new Error(topics.reason);
        }

        setTopics(topics);
      } catch (error) {
        toast.error(
          (error as Error).message ?? 'Ошибка верификации пользователя!'
        );
        navigate('/forum/login');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="sticky z-30 top-0 px-4 lg:px-6 h-14 flex items-center dark:bg-[#0c1b2a] bg-[#ffbf00]">
        <Link to={LINKS.home} variant="withIcon">
          <RocketIcon className="size-6 dark:text-[#ffc107] text-red-800" />
          <span className="dark:text-white text-[#0c1b2a] ml-2">
            Capybara Crusaders
          </span>
        </Link>

        <Button
          variant="acent"
          className="ml-auto mr-6"
          onClick={async () => {
            try {
              await forumApi.logout();
              navigate('/forum/login');
            } catch (error) {
              toast.error('Ошибка при выходе!');
            }
          }}>
          Выйти из форума
        </Button>
        <ThemeButton />
      </header>

      <MainSection className="p-4 w-full">
        <div className="flex flex-row">
          <h1 className="text-5xl font-bold p-2 dark:text-[#ffc107] text-red-700 mb-10">
            Форум
          </h1>
        </div>

        <ForumCreate setTopics={setTopics} />
        <div className="flex flex-row gap-4 dark:text-white">
          {topics.length > 0
            ? topics.map(topic => (
                <ForumTopic
                  key={topic.id}
                  currentUserId={userId?.id}
                  setTopics={setTopics}
                  {...topic}
                />
              ))
            : 'Здесь пусто... Даже слишком'}
        </div>
      </MainSection>
    </>
  );
}

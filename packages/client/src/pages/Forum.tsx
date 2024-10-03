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

export default function Forum() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicArray[]>([]);
  const userId = useAppSelector(selectUserForum);
  const dispatch = useAppDispatch();

  console.log('userId', userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await forumApi.getUser();

        if (!user) throw new Error('Не удалось найти пользователя');

        dispatch(setUserForum(user));

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
    <MainSection className="p-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-5xl font-bold p-2">Форум</h1>
        <Button
          variant="acent"
          className="ml-auto"
          onClick={async () => {
            try {
              await forumApi.logout();
            } catch (error) {
              toast.error('Ошибка при выходе!');
            }
          }}>
          Выйти из профиля
        </Button>
        <ThemeButton />
        <hr />
      </div>
      <ForumCreate setTopics={setTopics} />
      <div className="flex flex-row gap-4">
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
  );
}

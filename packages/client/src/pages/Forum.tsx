import { useEffect, useState } from 'react';
import forumApi from '../api/fetchTransport/forumApi';
import { forumTokenLocalStorageKey } from '../constants/forumConsts';
import { useNavigate } from 'react-router-dom';
import ForumCreate from '../components/molecules/ForumCreate';
import { TopicArray } from '../types/validationSchemas';
import ForumTopic from '../components/molecules/ForumTopic';
import MainSection from '../components/atoms/MainSection';

export default function Forum() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicArray[]>([]);

  useEffect(() => {
    const token = localStorage.getItem(forumTokenLocalStorageKey);
    if (!token) navigate('/forum/login');
    forumApi
      .getTopics(token as string)
      .then(topics => {
        if ('reason' in topics) {
          throw new Error(topics.reason);
        }

        setTopics(topics);
      })
      .catch(console.error);
  }, []);

  return (
    <MainSection>
      <div>
        <h1 className="text-5xl font-bold p-2">Форум</h1>
        <hr />
      </div>
      <ForumCreate setTopics={setTopics} />
      <div className="flex flex-row gap-4">
        {topics.length > 0
          ? topics.map(topic => (
              <ForumTopic key={topic.id} setTopics={setTopics} {...topic} />
            ))
          : 'Здесь пусто... Даже слишком'}
      </div>
    </MainSection>
  );
}

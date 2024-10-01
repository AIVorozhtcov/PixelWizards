import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import forumApi from '../api/fetchTransport/forumApi';
import MainSection from '../components/atoms/MainSection';
import ForumCreate from '../components/molecules/ForumCreate';
import ForumTopic from '../components/molecules/ForumTopic';
import { TopicArray } from '../types/validationSchemas';

export default function Forum() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicArray[]>([]);

  useEffect(() => {
    forumApi
      .getTopics()
      .then(topics => {
        if ('reason' in topics) {
          throw new Error(topics.reason);
        }

        setTopics(topics);
      })
      .catch(err => {
        console.error(err);
        navigate('/forum/login');
      });
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

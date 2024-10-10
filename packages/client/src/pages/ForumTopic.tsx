import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import forumApi from '../api/fetchTransport/forumApi';
import Button from '../components/atoms/Button';
import MainSection from '../components/atoms/MainSection';
import Subtitle from '../components/atoms/Subtitle';
import Text from '../components/atoms/Text';
import Title from '../components/atoms/Title';
import Message from '../components/molecules/Message';
import Form from '../components/organisms/Form';
import { FORUM_CREATE_COMMENT_INPUTS_DATA } from '../constants/profilePageData';
import { ForumCreateCommentSchema } from '../types/validationSchemas';
import ThemeButton from '../components/molecules/ThemeButton';
import Link from '../components/atoms/Link';
import RocketIcon from '../components/atoms/icon/RocketIcon';
import LINKS from '../constants/links';

export default function ForumTopic() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [comments, setComments] = useState<
    {
      id: number;
      content: string;
      userId: number;
      topicId: number;
      reaction?: string | null;
    }[]
  >([]);

  const handleCreateComment = async ({ content }: { content: string }) => {
    try {
      const comment = await forumApi.createComment({
        content,
        topicId: state.id,
      });

      if ('reason' in comment) {
        throw new Error(comment.reason);
      }

      setComments(prev => [...prev, comment]);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    const fetchTopicComments = async () => {
      const data = await forumApi.getCommentsByTopic(state.id);

      if ('reason' in data) {
        throw new Error(data.reason);
      }

      setComments(data);
    };

    fetchTopicComments().catch(error => toast.error(error.message));
  }, []);

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

      <MainSection className="p-4">
        <div className="flex flex-row justify-end">
          <Button variant="acent" onClick={() => navigate(-1)}>
            {'Назад'}
          </Button>
        </div>

        <div className="flex flex-col gap-3 pb-3 mb-10">
          <Title>{state.title}</Title>
          <Text>{state.content}</Text>
        </div>

        <Subtitle as="h3" variant="h3" className="text-2xl mb-3">
          Комментарии
        </Subtitle>
        <hr className="dark:border-[#364354]" />
        <div className="flex flex-col gap-4 justify-start align-start mt-3">
          {comments.length > 0 ? (
            comments.map(comment => (
              <Message
                key={comment.id}
                id={comment.id}
                text={comment.content}
                reaction={comment?.reaction ?? null}
              />
            ))
          ) : (
            <p className="dark:text-white">Пока комментариев нет</p>
          )}
        </div>
        <Form<{ topicId: string; content: string }>
          formClass="flex gap-4 items-center mt-10"
          zodSchema={ForumCreateCommentSchema}
          onSubmit={handleCreateComment}
          buttonText="Создать"
          buttonVariant="acentNotTransparent"
          buttonClass="bg-[#ffc107] h-[50px]"
          formFieldClass="mb-4 w-80"
          labelVariant="basic"
          inputVariant="basic"
          fields={FORUM_CREATE_COMMENT_INPUTS_DATA}
        />
      </MainSection>
    </>
  );
}

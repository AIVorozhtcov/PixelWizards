import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import forumApi from '../api/fetchTransport/forumApi';
import Subtitle from '../components/atoms/Subtitle';
import Text from '../components/atoms/Text';
import Title from '../components/atoms/Title';
import Form from '../components/organisms/Form';
import { forumTokenLocalStorageKey } from '../constants/forumConsts';
import { FORUM_CREATE_COMMENT_INPUTS_DATA } from '../constants/profilePageData';
import { ForumCreateCommentSchema } from '../types/validationSchemas';
import Message from '../components/molecules/Message';
import Button from '../components/atoms/Button';
import MainSection from '../components/atoms/MainSection';

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
      const comment = await forumApi.createComment(
        {
          content,
          topicId: state.id,
        },
        localStorage.getItem(forumTokenLocalStorageKey) ?? ''
      );

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
      const data = await forumApi.getCommentsByTopic(
        state.id,
        localStorage.getItem(forumTokenLocalStorageKey) ?? ''
      );

      if ('reason' in data) {
        throw new Error(data.reason);
      }

      setComments(data);
    };

    fetchTopicComments().catch(error => toast.error(error.message));
  }, []);

  return (
    <MainSection>
      <div className="flex justify-between items-center">
        <div>
          <Title>{state.title}</Title>
          <Text>{state.content}</Text>
        </div>
        <div>
          <Button
            onClick={async () => {
              const data = await forumApi.getCommentsByTopic(
                state.id,
                localStorage.getItem(forumTokenLocalStorageKey) ?? ''
              );

              console.log('data', data);
            }}>
            Click
          </Button>
          <Button variant="acent" onClick={() => navigate(-1)}>
            {'Назад'}
          </Button>
        </div>
      </div>
      <hr />
      <Subtitle as="h2" variant="h2">
        Комментарии
      </Subtitle>
      {comments.length > 0
        ? comments.map(comment => (
            <Message
              key={comment.id}
              id={comment.id}
              text={comment.content}
              reaction={comment?.reaction ?? null}
            />
          ))
        : 'Пока комментариев нет'}
      <Form<{ topicId: string; content: string }>
        formClass="flex gap-4 items-center"
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
  );
}

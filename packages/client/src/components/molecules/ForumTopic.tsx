import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import forumApi from '../../api/fetchTransport/forumApi';
import { TopicArray } from '../../types/validationSchemas';
import Button from '../atoms/Button';
import Subtitle from '../atoms/Subtitle';
import Text from '../atoms/Text';

function ForumTopic(
  props: TopicArray & { currentUserId?: number } & {
    setTopics: React.Dispatch<
      React.SetStateAction<
        {
          id: number;
          title: string;
          content: string;
          createdAt: string;
          userId: number;
          updatedAt: string;
        }[]
      >
    >;
  }
) {
  const navigate = useNavigate();

  const handleOpenTopic = () => {
    navigate(`/forum/topic/${props.id}`, {
      state: {
        id: props.id,
        title: props.title,
        content: props.content,
      },
    });
  };

  const handleDeleteTopic = async (event: React.MouseEvent) => {
    try {
      event.stopPropagation();
      await forumApi.deleteTopic(String(props.id));
      props.setTopics(prev => prev.filter(topic => topic.id !== props.id));
    } catch (error) {
      toast.error('Возникла ошибка при удалении топика');
    }
  };

  return (
    <div
      className="flex flex-col gap-4 border border-white rounded cursor-pointer p-4 min-w-60"
      onClick={handleOpenTopic}>
      <div className="flex justify-between">
        <Subtitle as="h3" variant="h3">
          {props.title}
        </Subtitle>
        {props.currentUserId && props.currentUserId === props.userId && (
          <Button onClick={handleDeleteTopic} className="text-[red]">
            X
          </Button>
        )}
      </div>
      <Text>{props.content}</Text>
      <Text variant="caption">{props.createdAt}</Text>
    </div>
  );
}

export default ForumTopic;

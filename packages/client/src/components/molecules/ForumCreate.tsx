import { toast } from 'sonner';
import forumApi from '../../api/fetchTransport/forumApi';
import { FORUM_CREATE_TOPICS_INPUTS_DATA } from '../../constants/profilePageData';
import {
  ForumCreateTopicSchema,
  TopicArray,
} from '../../types/validationSchemas';
import Form from '../organisms/Form';

function ForumCreate({
  setTopics,
}: {
  setTopics: React.Dispatch<React.SetStateAction<TopicArray[]>>;
}) {
  const handleCreateTopic = async (data: {
    title: string;
    content: string;
  }) => {
    try {
      const response = await forumApi.createTopic(data);

      if ('reason' in response) {
        throw new Error(response.reason);
      }

      setTopics(prev => [...prev, response]);
    } catch (error) {
      toast.error(
        'Возникла ошибка при создании топика. ' + (error as Error).message
      );
    }
  };
  return (
    <Form<{
      title: string;
      content: string;
    }>
      formClass="flex gap-4 items-center"
      zodSchema={ForumCreateTopicSchema}
      onSubmit={handleCreateTopic}
      buttonText="Создать"
      buttonVariant="acentNotTransparent"
      buttonClass="bg-[#ffc107] h-[50px] text-[#0c1b2a]"
      formFieldClass="mb-4 w-80"
      labelVariant="basic"
      inputVariant="basic"
      fields={FORUM_CREATE_TOPICS_INPUTS_DATA}
    />
  );
}

export default ForumCreate;

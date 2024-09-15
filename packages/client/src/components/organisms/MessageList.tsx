import { useAppSelector } from '../../lib/hooks';
import Message from '../molecules/Message';

function MessageList() {
  const { topicMessages } = useAppSelector(store => store.topicMessagesSlice);

  return (
    <div className="flex flex-col gap-4">
      {Array.isArray(topicMessages)
        ? topicMessages.map(({ id, text, reactions }) => (
            <Message key={id} text={text} reactions={reactions} id={id} />
          ))
        : topicMessages}
    </div>
  );
}

export default MessageList;

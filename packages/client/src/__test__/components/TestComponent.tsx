import { useEffect } from 'react';
import MessageList from '../../components/organisms/MessageList';
import { useAppDispatch } from '../../lib/hooks';
import { fetchTopicMessages } from '../../store/slices/topicMessages';

export default function TestComponent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopicMessages(123));
  }, []);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <MessageList />
    </div>
  );
}

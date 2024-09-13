import { useParams } from 'react-router-dom';

export default function ForumTopic() {
  const params = useParams();
  console.log({ params });
  return <>Топик форума</>;
}

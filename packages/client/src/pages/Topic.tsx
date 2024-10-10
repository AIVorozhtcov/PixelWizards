import { useParams } from 'react-router-dom';

export default function Topic() {
  const params = useParams();
  console.log({ params });
  return <>Топик форума</>;
}

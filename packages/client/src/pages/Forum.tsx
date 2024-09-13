import { useEffect, useState } from 'react';
import forumApi from '../api/fetchTransport/forumApi';
import { forumTokenLocalStorageKey } from '../constants/forumConsts';
import { useNavigate } from 'react-router-dom';

export default function Forum() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(forumTokenLocalStorageKey);
    if (!token) navigate('/forum/login');
    forumApi.getTopics(token as string).then(topics => console.log(topics));
  }, []);

  return (
    <div className="text-white w-full h-screen p-5 bg-[#0c1b2a]">
      <h1 className="text-5xl font-bold p-2">Форум</h1>
      <hr />
    </div>
  );
}

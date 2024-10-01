import { useEffect } from 'react';
import forumApi from '../../api/fetchTransport/forumApi';

export default function TestComponent() {
  useEffect(() => {
    const fetchTest = async () => {
      const response = await forumApi.getTopics();

      console.log(response);
    };

    fetchTest();
  }, []);
  return (
    <div className="flex justify-center items-center w-screen h-screen"></div>
  );
}

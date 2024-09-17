import { useEffect } from 'react';
import forumApi from '../../api/fetchTransport/forumApi';
import { forumTokenLocalStorageKey } from '../../constants/forumConsts';

export default function TestComponent() {
  useEffect(() => {
    const fetchTest = async () => {
      const response = await forumApi.getTopics(forumTokenLocalStorageKey);

      console.log(response);
    };

    fetchTest();
  }, []);
  return (
    <div className="flex justify-center items-center w-screen h-screen"></div>
  );
}

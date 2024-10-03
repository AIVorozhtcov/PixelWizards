import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectUserForum, setUserForum } from '../../store/slices/userForum';

export default function App() {
  const userId = useAppSelector(selectUserForum);
  const dispatch = useAppDispatch();

  console.log(userId);

  useEffect(() => {
    dispatch(
      setUserForum({
        userForum: {
          id: 1,
          login: '2',
        },
      })
    );
  }, []);
  return (
    <div className="app h-screen text-black flex justify-center items-center">
      <div className="box">Hello</div>
    </div>
  );
}

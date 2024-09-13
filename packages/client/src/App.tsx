import { useSelector } from './store/store';

const App = () => {
  const user = useSelector(store => store.user.user);
  return (
    <div>
      {user ? (
        <div>
          <p>{user.first_name}</p>
          <p>{user.second_name}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  );
};

export default App;

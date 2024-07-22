import Button from '../components/atoms/Button';
import ProfileContainer from '../components/organisms/ProfileContainer';

export default function Profile() {
  return (
    <div className="relative w-full min-h-screen p-4 pt-10">
      <Button className="absolute top-4 left-4 hover:bg-gray-300 bg-gray-200 rounded-md p-1">
        Закрыть
      </Button>
      <ProfileContainer />
    </div>
  );
}

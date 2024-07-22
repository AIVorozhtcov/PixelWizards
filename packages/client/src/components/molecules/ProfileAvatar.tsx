import Image from '../atoms/Image';
import { MOCK_AVATAR_PATH } from '../../constants/profilePageData';
import Span from '../atoms/Span';

const ProfileAvatar = () => {
  return (
    <div className="w-[130px] h-[130px] rounded-full overflow-hidden hover:cursor-pointer">
      <Span className=""></Span>
      <Image
        src={MOCK_AVATAR_PATH}
        alt="Аватар пользователя"
        className="w-full h-full object-cover"
      />
      <Span className="">Поменять аватар</Span>
    </div>
  );
};

export default ProfileAvatar;

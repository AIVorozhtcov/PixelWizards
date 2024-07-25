import Image from '../atoms/Image';
import { MOCK_AVATAR_PATH } from '../../constants/profilePageData';
import Span from '../atoms/Span';
import { MouseEventHandler } from 'react';

type ProfileAvatarProps = {
  handleClick: MouseEventHandler<HTMLDivElement>;
};

const ProfileAvatar = ({ handleClick }: ProfileAvatarProps) => {
  return (
    <div
      className="w-[130px] h-[130px] relative rounded-full overflow-hidden hover:cursor-pointer hover:filter()"
      onClick={handleClick}>
      <Span className="absolute w-full h-full hover:bg-black hover:opacity-20 hover:cursor-pointer"></Span>
      <Image
        src={MOCK_AVATAR_PATH}
        alt="Аватар пользователя"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileAvatar;

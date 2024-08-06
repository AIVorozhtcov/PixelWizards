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
      className="group w-44 h-44 relative rounded-full overflow-hidden border-2"
      onClick={handleClick}>
      <Span className="absolute w-full h-full group-hover:bg-black opacity-40 cursor-pointer" />
      <Span className="absolute w-full h-full my-20 mx-6 text-white hidden group-hover:block cursor-pointer">
        Поменять аватар
      </Span>

      <Image
        src={MOCK_AVATAR_PATH}
        alt="Аватар пользователя"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileAvatar;

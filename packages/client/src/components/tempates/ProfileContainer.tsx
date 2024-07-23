import { useState } from 'react';
import ProfileAvatar from '../molecules/ProfileAvatar';
import { ProfileModeType } from '../../types/types';
import ProfileModManager from './ProfileModeManager';
import Button from '../atoms/Button';
import { PROFILE_MODE } from '../../constants/profilePageData';
import { useNavigate } from 'react-router-dom';
import links from '../../constants/links';

const ProfileContainer = () => {
  const [mode, setMode] = useState<ProfileModeType>('base');
  const navigate = useNavigate();

  const handleClick = () => {
    if (mode === PROFILE_MODE.base) {
      navigate(links.home);
    } else {
      setMode(PROFILE_MODE.base);
    }
  };

  return (
    <>
      <Button
        className="absolute top-4 left-4 hover:bg-gray-300 bg-gray-200 rounded-md p-1"
        onClick={handleClick}>
        Закрыть
      </Button>
      <div className="flex flex-col items-center gap-6 max-w-[500px] min-w-80 mt-0 mb-0 mr-auto ml-auto">
        <ProfileAvatar />
        <div className="w-full flex flex-col gap-10">
          <ProfileModManager mode={mode} setMode={setMode} />
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;

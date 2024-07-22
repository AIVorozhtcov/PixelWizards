import { useState } from 'react';
import {
  PROFILE_BUTTONS,
  PROFILE_INPUTS_DATA,
  PROFILE_MODE,
} from '../../constants/profilePageData';
import ProfileAvatar from '../molecules/ProfileAvatar';
import ProfileButtonsList from '../molecules/ProfileButtonsList';
import ProfileList from '../molecules/ProfileList';

type ModeKeys = keyof typeof PROFILE_MODE;
export type ProfileModeType = typeof PROFILE_MODE[ModeKeys];

const ProfileContainer = () => {
  const [mode, setMode] = useState<ProfileModeType>('base');

  return (
    <div className="flex flex-col items-center gap-6 max-w-[500px] min-w-80 mt-0 mb-0 mr-auto ml-auto">
      <ProfileAvatar />
      <div className="w-full flex flex-col gap-10">
        {mode === PROFILE_MODE.editData ? (
          <>Редактировние</>
        ) : mode === PROFILE_MODE.editPassword ? (
          <>Редактировние пароля</>
        ) : (
          <ProfileList profileData={PROFILE_INPUTS_DATA} />
        )}
        <ProfileButtonsList buttons={PROFILE_BUTTONS} setMode={setMode} />
      </div>
    </div>
  );
};

export default ProfileContainer;

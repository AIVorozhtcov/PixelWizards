import Button from '../atoms/Button';
import {
  PROFILE_BUTTONS,
  PROFILE_CHANGE_PASSWORD_INPUTS,
  PROFILE_INPUTS_DATA,
  PROFILE_MODE,
} from '../../constants/profilePageData';
import { ProfileModeType } from '../../types/types';
import ProfileList from '../organisms/ProfileList';
import ProfileButtonsList from '../organisms/ProfileButtonsList';
import ProfileForm from '../organisms/ProfileForm';
import { Dispatch, SetStateAction } from 'react';

type ProfileModeManagerProps = {
  mode: ProfileModeType;
  setMode: Dispatch<SetStateAction<string>>;
};

const ProfileModManager = ({ mode, setMode }: ProfileModeManagerProps) => {
  switch (mode) {
    case PROFILE_MODE.base:
      return (
        <>
          <ProfileList profileData={PROFILE_INPUTS_DATA} />
          <ProfileButtonsList buttons={PROFILE_BUTTONS} setMode={setMode} />
        </>
      );
    case PROFILE_MODE.editData:
      return <ProfileForm profileFormData={PROFILE_INPUTS_DATA} mode={mode} />;
    case PROFILE_MODE.editPassword:
      return (
        <ProfileForm
          profileFormData={PROFILE_CHANGE_PASSWORD_INPUTS}
          mode={mode}
        />
      );
    default:
      return (
        <>
          <ProfileList profileData={PROFILE_INPUTS_DATA} />
          <ProfileButtonsList buttons={PROFILE_BUTTONS} setMode={setMode} />
        </>
      );
  }
};

export default ProfileModManager;

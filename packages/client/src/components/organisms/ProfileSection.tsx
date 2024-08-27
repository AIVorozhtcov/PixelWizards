import { useState } from 'react';
import generalAPI from '../../api/fetchTransport/generalApi';
import { PROFILE_MODE, PROFILE_POPUP } from '../../constants/profilePageData';
import { FormAvatarType, ProfileModeType } from '../../types/types';
import { ProfileUpdateAvatarSchema } from '../../types/validationSchemas';
import Button from '../atoms/Button';
import Popup from '../molecules/Popup';
import ProfileAvatar from '../molecules/ProfileAvatar';
import ProfileModeManager from './ProfileModeManager';

const ProfileSection = () => {
  const [mode, setMode] = useState<ProfileModeType>('base');
  const [isPopupDisplay, setPopupDisplay] = useState<boolean>(false);

  const handleClick = () => setMode(PROFILE_MODE.base);

  return (
    <>
      {isPopupDisplay && (
        <Popup<FormAvatarType>
          handleClick={() => setPopupDisplay(false)}
          onSubmit={data => {
            // TODO Notification if error
            generalAPI.updateUserAvatar(data);
          }}
          zodSchema={ProfileUpdateAvatarSchema}
          popup={PROFILE_POPUP}
        />
      )}
      {mode !== PROFILE_MODE.base && (
        <Button
          variant="red"
          className="absolute top-4 left-4"
          onClick={handleClick}>
          Закрыть
        </Button>
      )}
      <div className="flex flex-col items-center gap-6 max-w-lg min-w-80 my-0 mx-auto">
        <ProfileAvatar handleClick={() => setPopupDisplay(true)} />
        <div className="w-full flex flex-col gap-10">
          <ProfileModeManager mode={mode} setMode={setMode} />
        </div>
      </div>
    </>
  );
};

export default ProfileSection;

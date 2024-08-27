import { useState } from 'react';
import generalAPI from '../../api/fetchTransport/generalApi';
import { PROFILE_POPUP } from '../../constants/profilePageData';
import { FormAvatarType } from '../../types/types';
import { ProfileUpdateAvatarSchema } from '../../types/validationSchemas';
import Popup from '../molecules/Popup';
import ProfileAvatar from '../molecules/ProfileAvatar';

const ProfileSection = ({ children }: { children: React.ReactNode }) => {
  const [isPopupDisplay, setPopupDisplay] = useState<boolean>(false);

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
      <div className="flex flex-col items-center gap-6 max-w-lg min-w-80 my-0 mx-auto">
        <ProfileAvatar handleClick={() => setPopupDisplay(true)} />
        {children}
      </div>
    </>
  );
};

export default ProfileSection;

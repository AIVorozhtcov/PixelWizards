import { useState } from 'react';
import { PROFILE_POPUP } from '../../constants/profilePageData';
import { FormAvatarType, UserData } from '../../types';
import { ProfileUpdateAvatarSchema } from '../../types/validationSchemas';
import Popup from '../molecules/Popup';
import ProfileAvatar from '../molecules/ProfileAvatar';
import { toast } from 'sonner';
import { setUserData } from '../../store/slices/user';
import { useAppDispatch } from '../../lib/hooks';
import generalAPI from '../../api/fetchTransport/generalApi';

const ProfileSection = ({ children }: { children: React.ReactNode }) => {
  const [isPopupDisplay, setPopupDisplay] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      {isPopupDisplay && (
        <Popup<FormAvatarType>
          handleClick={() => setPopupDisplay(false)}
          onSubmit={async data => {
            toast.message('Обновляем аватар...');
            const user = await generalAPI.updateUserAvatar(data);

            if ('reason' in user) {
              toast.error('Не удалось обновить аватар. Попробуйте еще раз.');
              return;
            }

            dispatch(setUserData(user as UserData));
            setPopupDisplay(!isPopupDisplay);
            toast.success('Аватар обновлен!');
          }}
          zodSchema={ProfileUpdateAvatarSchema}
          popup={PROFILE_POPUP}
        />
      )}
      <div className="flex flex-col items-center gap-6 max-w-lg min-w-80 w-full my-0 mx-auto">
        <ProfileAvatar handleClick={() => setPopupDisplay(true)} />
        {children}
      </div>
    </>
  );
};

export default ProfileSection;

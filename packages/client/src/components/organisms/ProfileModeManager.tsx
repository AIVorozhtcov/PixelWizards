import { useState } from 'react';
import { toast } from 'sonner';
import generalAPI from '../../api/fetchTransport/generalApi';
import {
  PROFILE_BUTTONS,
  PROFILE_CHANGE_PASSWORD_INPUTS,
  PROFILE_INPUTS_DATA,
  PROFILE_MODE,
} from '../../constants/profilePageData';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setUserData } from '../../store/slices/user';
import {
  ProfileFormData,
  ProfileModeType,
  ProfilePasswordFormData,
} from '../../types/types';
import {
  ProfileUpdateDataSchema,
  ProfileUpdatePasswordSchema,
} from '../../types/validationSchemas';
import Button from '../atoms/Button';
import ProfileButtonsList from '../molecules/ProfileButtonsList';
import Form from './Form';
import ProfileList from './ProfileList';

const ProfileModeManager = () => {
  const [mode, setMode] = useState<ProfileModeType>('base');
  const handleClick = () => setMode(PROFILE_MODE.base);
  const userInfo = useAppSelector(state => state.userSlice.user);
  const dispatch = useAppDispatch();

  switch (mode) {
    case PROFILE_MODE.base:
      return (
        <>
          <ProfileList profileData={PROFILE_INPUTS_DATA} userInfo={userInfo} />
          <ProfileButtonsList buttons={PROFILE_BUTTONS} setMode={setMode} />
        </>
      );
    case PROFILE_MODE.editData:
      return (
        <>
          <Form<ProfileFormData>
            zodSchema={ProfileUpdateDataSchema}
            onSubmit={async (data: ProfileFormData) => {
              const user = await generalAPI.updateUserProfile(data);

              if ('reason' in user) {
                toast.error('Не удалось обновить данные. Попробуйте еще раз.');
                return;
              }

              dispatch(setUserData(user));
              setMode('base');
            }}
            buttonText="Сохранить"
            buttonVariant="yellow"
            buttonClass="w-full mt-10"
            formFieldClass="mb-2"
            labelVariant="profile"
            inputVariant="profile"
            defaultValues={userInfo}
            fields={PROFILE_INPUTS_DATA}
          />
          <Button
            variant="red"
            className="absolute top-4 left-4"
            onClick={handleClick}>
            Закрыть
          </Button>
        </>
      );
    case PROFILE_MODE.editPassword:
      return (
        <>
          <Form<ProfilePasswordFormData>
            zodSchema={ProfileUpdatePasswordSchema}
            onSubmit={(data: ProfilePasswordFormData) => {
              const passwordChange = generalAPI.updatePassword(data);

              if ('reason' in passwordChange) {
                toast.error('Не удалось обновить данные. Попробуйте еще раз.');
                return;
              }

              setMode('base');
            }}
            buttonText="Сохранить"
            buttonVariant="yellow"
            buttonClass="w-full mt-10"
            formFieldClass="mb-2"
            labelVariant="profile"
            inputVariant="profile"
            fields={PROFILE_CHANGE_PASSWORD_INPUTS}
          />
          <Button
            variant="red"
            className="absolute top-4 left-4"
            onClick={handleClick}>
            Закрыть
          </Button>
        </>
      );
    default:
      return (
        <>
          <ProfileList profileData={PROFILE_INPUTS_DATA} userInfo={userInfo} />
          <ProfileButtonsList buttons={PROFILE_BUTTONS} setMode={setMode} />
        </>
      );
  }
};

export default ProfileModeManager;

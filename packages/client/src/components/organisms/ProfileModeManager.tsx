import {
  PROFILE_BUTTONS,
  PROFILE_CHANGE_PASSWORD_INPUTS,
  PROFILE_INPUTS_DATA,
  PROFILE_MODE,
} from '../../constants/profilePageData';
import {
  ProfileModeType,
  ProfileFormData,
  ProfilePasswordFormData,
} from '../../types/types';
import ProfileList from './ProfileList';
import ProfileButtonsList from '../molecules/ProfileButtonsList';
import { Dispatch, SetStateAction } from 'react';
import Form from './Form';
import {
  ProfileUpdateDataSchema,
  ProfileUpdatePasswordSchema,
} from '../../types/validationSchemas';
import { updatePassword, updateUserProfile } from '../../api/userApi';
import { MOCK_FORM_DEFAULT_VALUES } from '../../constants/mockProfileFormDefaultValues';

type ProfileModeManagerProps = {
  mode: ProfileModeType;
  setMode: Dispatch<SetStateAction<string>>;
};

const ProfileModeManager = ({ mode, setMode }: ProfileModeManagerProps) => {
  switch (mode) {
    case PROFILE_MODE.base:
      return (
        <>
          <ProfileList profileData={PROFILE_INPUTS_DATA} />
          <ProfileButtonsList buttons={PROFILE_BUTTONS} setMode={setMode} />
        </>
      );
    case PROFILE_MODE.editData:
      return (
        <Form<ProfileFormData>
          zodSchema={ProfileUpdateDataSchema}
          onSubmit={(data: ProfileFormData) => updateUserProfile(data)}
          buttonText="Сохранить"
          buttonVariant="yellow"
          buttonClass="w-full mt-10"
          formFieldClass="mb-2"
          labelVariant="profile"
          inputVariant="profile"
          defaultValues={MOCK_FORM_DEFAULT_VALUES}
          fields={PROFILE_INPUTS_DATA}
          profileMode={mode}
        />
      );
    case PROFILE_MODE.editPassword:
      return (
        <Form<ProfilePasswordFormData>
          zodSchema={ProfileUpdatePasswordSchema}
          onSubmit={(data: ProfilePasswordFormData) => updatePassword(data)}
          buttonText="Сохранить"
          buttonVariant="yellow"
          buttonClass="w-full mt-10"
          formFieldClass="mb-2"
          labelVariant="profile"
          inputVariant="profile"
          fields={PROFILE_CHANGE_PASSWORD_INPUTS}
          profileMode={mode}
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

export default ProfileModeManager;

import FORM_INPUT_NAMES from '../constants/formInputNames';
import { PROFILE_MODE } from '../constants/profilePageData';

export type RegistrationFormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  passwordAgain: string;
  phone: string;
};

export type ProfileFormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phonr: string;
};

export type ProfilePasswordFormData = {
  oldPassword: string;
  newPassword: string;
  passwordAgain: string;
};

type ModeKeys = keyof typeof PROFILE_MODE;
export type ProfileModeType = typeof PROFILE_MODE[ModeKeys];

export type ProfileDataType = {
  title: string;
  name: string;
  type: string;
};

export type FormType = typeof FORM_INPUT_NAMES;

export type FormAvatarType = {
  avatar: File[];
};

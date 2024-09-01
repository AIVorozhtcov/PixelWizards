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

export type LoginFormData = {
  login: string;
  password: string;
};

export type ProfileFormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string | null;
  phone: string;
};

export type ProfilePasswordFormData = {
  oldPassword: string;
  newPassword: string;
  passwordAgain: string;
};

type ModeKeys = keyof typeof PROFILE_MODE;
export type ProfileModeType = typeof PROFILE_MODE[ModeKeys];

export type ProfileDataType = {
  label: string;
  name: string;
  type: string;
};

export type FormAvatarType = {
  avatar: FileList;
};

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string | null;
  login: string;
  avatar: string | null;
  email: string;
};

export type SignInData = {
  login: string;
  password: string;
};

export type Profile = ProfileFormData & {
  id: string;
  avatar: string;
};

export type RedirectUri = {
  redirect_uri: string;
};

export type OauthSignin = {
  code: string;
  redirect_uri: string;
};

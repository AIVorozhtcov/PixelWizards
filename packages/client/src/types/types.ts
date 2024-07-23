import { PROFILE_MODE } from '../constants/profilePageData';

export type RegistrationFormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

type ModeKeys = keyof typeof PROFILE_MODE;
export type ProfileModeType = typeof PROFILE_MODE[ModeKeys];

export type ProfileDataType = {
  title: string;
  name: string;
  type: string;
};

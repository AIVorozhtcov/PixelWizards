import { IMETHOD, URLS } from '../constants/apiConstants';
import { PROFILE_MODE } from '../constants/profilePageData';

export type ForumRegistrationFormData = {
  login: string;
  password: string;
  passwordAgain: string;
};

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
  phone: string;
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

export interface IUserState {
  user: UserData;
}

export type Data = Record<string, string | null>;

export type Path = `/${string}` | '';
export type Headers = { extends?: boolean } & Record<string, string | boolean>;

export type MethodKeys = typeof IMETHOD[keyof typeof IMETHOD];

export interface BaseAPIConfig {
  path?: Path;
  baseUrl?: typeof URLS[keyof typeof URLS];
}

export interface Options {
  method?: MethodKeys;
  headers?: Headers;
  withCredentials?: RequestCredentials;
  signal?: AbortSignal;
  data?: Record<string, unknown> | FormData;
}

export type APIMethod = (
  endpoint: Path | URL,
  options?: Options
) => Promise<Response>;

export interface ImageWithTextPropsCustom {
  imgSrc: string;
  imgAlt: string;
  subtitle: string;
  text: string;
}

type InputVariation = 'default' | 'basic' | 'profile';

export interface FormFields {
  label: string;
  error?: string;
  name: string;
  labelClass?: string;
  formFieldClass?: string;
  labelVariant?: InputVariation;
  inputVariant?: InputVariation | 'typeFile';
  inputAcept?: string;
}
export type FormFieldProps = FormFields &
  React.InputHTMLAttributes<HTMLInputElement>;

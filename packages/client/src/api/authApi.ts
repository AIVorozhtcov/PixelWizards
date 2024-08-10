import { AUTH_PATHS, HEADERS, URLS } from '../constants/apiConstants';
import { RegistrationFormData, SignInData, UserData } from '../types/types';

export const signup = async (
  data: RegistrationFormData
): Promise<{ id: number } | undefined> => {
  try {
    const response = await fetch(`${URLS.base}${AUTH_PATHS.signup}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...HEADERS.CT_APPLICATION_JSON,
        ...HEADERS.ACCEPT,
      },
    });
    return (await response.json()) as { id: number };
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (
  data: SignInData
): Promise<boolean | undefined> => {
  try {
    const response = await fetch(`${URLS.base}${AUTH_PATHS.signin}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...HEADERS.CT_APPLICATION_JSON,
        ...HEADERS.ACCEPT,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (): Promise<UserData | undefined> => {
  try {
    const response = await fetch(`${URLS.base}${AUTH_PATHS.getUserInfo}`, {
      method: 'GET',
      headers: {
        ...HEADERS.CT_APPLICATION_JSON,
        ...HEADERS.ACCEPT,
      },
    });
    return (await response.json()) as UserData;
  } catch (error) {
    console.log(error);
  }
};

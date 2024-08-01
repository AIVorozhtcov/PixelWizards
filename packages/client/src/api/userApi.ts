import { HEADERS, URLS, USER_PATHS } from '../constants/apiConstants';
import {
  FormAvatarType,
  ProfileFormData,
  ProfilePasswordFormData,
} from '../types/types';

export const updateUserProfile = async (data: ProfileFormData) => {
  await fetch(`${URLS.base}${USER_PATHS.updateProfile}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      ...HEADERS.CT_APPLICATION_JSON,
      ...HEADERS.ACCEPT,
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const updatePassword = async (data: ProfilePasswordFormData) => {
  const preparedData = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  };

  await fetch(`${URLS.base}${USER_PATHS.updatePassword}`, {
    method: 'PUT',
    body: JSON.stringify(preparedData),
    headers: {
      ...HEADERS.CT_APPLICATION_JSON,
      ...HEADERS.ACCEPT,
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const updateUserAvatar = async (data: FormAvatarType) => {
  const formData = new FormData();
  formData.append('avatar', data.avatar[0]);

  await fetch(`${URLS.base}${USER_PATHS.updateAvatar}`, {
    method: 'PUT',
    body: formData,
    headers: {},
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

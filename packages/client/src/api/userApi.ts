import { RefObject } from 'react';
import { HEADERS, URLS, USER_PATHS } from '../constants/apiConstants';
import { PROFILE_MODE } from '../constants/profilePageData';
import { FormAvatarType, FormType, ProfileModeType } from '../types/types';

export const updateUserData = (data: FormType, mode: ProfileModeType) => {
  if (mode === PROFILE_MODE.editData) {
    updateUserProfile(data);
  }

  if (mode === PROFILE_MODE.editPassword) {
    updatePassword(data);
  }
};

export const updateUserProfile = async (data: FormType) => {
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

export const updatePassword = async (data: FormType) => {
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

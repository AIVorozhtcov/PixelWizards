import {
  FormAvatarType,
  ProfileFormData,
  ProfilePasswordFormData,
} from '../types/types';
import customFetch from './fetchTransport/generalApi';

export const updateUserProfile = async (data: ProfileFormData) => {
  try {
    return await customFetch.updateUserProfile(data);
  } catch (error) {
    console.log(error);

    return error as Error;
  }
};

export const updatePassword = async (data: ProfilePasswordFormData) => {
  const preparedData = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  };

  try {
    return await customFetch.updatePassword(preparedData);
  } catch (error) {
    console.log(error);

    return error as Error;
  }
};

export const updateUserAvatar = async (data: FormAvatarType) => {
  const formData = new FormData();
  formData.append('avatar', data.avatar[0]);

  try {
    return await customFetch.updateUserAvatar(formData);
  } catch (error) {
    console.log(error);

    return error as Error;
  }
};

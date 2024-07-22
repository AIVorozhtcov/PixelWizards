import FORM_INPUT_NAMES from './formInputNames';

export const PROFILE_INPUTS_DATA = [
  {
    title: 'Имя',
    name: FORM_INPUT_NAMES.firstName,
    type: 'text',
  },
  {
    title: 'Фамилия',
    name: FORM_INPUT_NAMES.secondName,
    type: 'text',
  },
  {
    title: 'Почта',
    name: FORM_INPUT_NAMES.email,
    type: 'email',
  },
  {
    title: 'Логин',
    name: FORM_INPUT_NAMES.login,
    type: 'text',
  },
  {
    title: 'Никнейм',
    name: FORM_INPUT_NAMES.displayName,
    type: 'text',
  },
  {
    title: 'Телефон',
    name: FORM_INPUT_NAMES.phone,
    type: 'tel',
  },
];

export const PROFILE_CHANGE_PASSWORD_INPUTS = [
  {
    title: 'Старый пароль',
    name: FORM_INPUT_NAMES.oldPassword,
    type: 'password',
  },
  {
    title: 'Новый пароль',
    name: FORM_INPUT_NAMES.newPassword,
    type: 'password',
  },
  {
    title: 'Повторите новый пароль',
    type: 'password',
    name: FORM_INPUT_NAMES.passwordAgain,
  },
];

export const MOCK_AVATAR_PATH = '/images/mock-profile-avatar.png';

export const PROFILE_MODE = {
  base: 'base',
  editData: 'edit-data',
  editPassword: 'edit-password',
};

export const PROFILE_BUTTONS = [
  {
    text: 'Изменить данные',
    mode: PROFILE_MODE.editData,
  },
  {
    text: 'Изменить пароль',
    mode: PROFILE_MODE.editPassword,
  },
  {
    text: 'Выйти',
    mode: PROFILE_MODE.base,
  },
];

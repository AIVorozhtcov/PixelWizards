import FORM_INPUT_NAMES from './formInputNames';

export const PROFILE_INPUTS_DATA = [
  {
    label: 'Имя',
    name: FORM_INPUT_NAMES.firstName,
    type: 'text',
  },
  {
    label: 'Фамилия',
    name: FORM_INPUT_NAMES.secondName,
    type: 'text',
  },
  {
    label: 'Почта',
    name: FORM_INPUT_NAMES.email,
    type: 'email',
  },
  {
    label: 'Логин',
    name: FORM_INPUT_NAMES.login,
    type: 'text',
  },
  {
    label: 'Никнейм',
    name: FORM_INPUT_NAMES.displayName,
    type: 'text',
  },
  {
    label: 'Телефон',
    name: FORM_INPUT_NAMES.phone,
    type: 'tel',
  },
];

export const PROFILE_CHANGE_PASSWORD_INPUTS = [
  {
    label: 'Старый пароль',
    name: FORM_INPUT_NAMES.oldPassword,
    type: 'password',
  },
  {
    label: 'Новый пароль',
    name: FORM_INPUT_NAMES.newPassword,
    type: 'password',
  },
  {
    label: 'Повторите новый пароль',
    type: 'password',
    name: FORM_INPUT_NAMES.passwordAgain,
  },
];

export const MOCK_AVATAR_PATH = '/capCapibara.webp';

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
];

export const PROFILE_POPUP = {
  popupTitle: 'Загрузите файл',
  buttonText: 'Поменять',
  inputType: 'file',
  inputName: FORM_INPUT_NAMES.avatar,
  inputAccept: 'image/*',
};

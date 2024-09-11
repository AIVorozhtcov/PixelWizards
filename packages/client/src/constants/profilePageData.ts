import { createInput } from '../utils/helpers';
import FORM_INPUT_NAMES from './formInputNames';

export const REGISTRATION_INPUTS_DATA = [
  createInput('Имя', FORM_INPUT_NAMES.firstName),
  createInput('Фамилия', FORM_INPUT_NAMES.secondName),
  createInput('Логин', FORM_INPUT_NAMES.login),
  createInput('Почта', FORM_INPUT_NAMES.email, 'email'),
  createInput('Пароль', FORM_INPUT_NAMES.password, 'password'),
  createInput('Повторите пароль', FORM_INPUT_NAMES.passwordAgain, 'password'),
  createInput('Телефон', FORM_INPUT_NAMES.phone, 'tel'),
];

export const PROFILE_INPUTS_DATA = [
  createInput('Имя', FORM_INPUT_NAMES.firstName),
  createInput('Фамилия', FORM_INPUT_NAMES.secondName),
  createInput('Почта', FORM_INPUT_NAMES.email, 'email'),
  createInput('Логин', FORM_INPUT_NAMES.login),
  createInput('Никнейм', FORM_INPUT_NAMES.displayName),
  createInput('Телефон', FORM_INPUT_NAMES.phone, 'tel'),
];

export const LOGIN_INPUTS_DATA = [
  createInput('Логин', FORM_INPUT_NAMES.login),
  createInput('Пароль', FORM_INPUT_NAMES.password, 'password'),
];

export const PROFILE_CHANGE_PASSWORD_INPUTS = [
  createInput('Старый пароль', FORM_INPUT_NAMES.oldPassword, 'password'),
  createInput('Новый пароль', FORM_INPUT_NAMES.newPassword, 'password'),
  createInput(
    'Повторите новый пароль',
    FORM_INPUT_NAMES.passwordAgain,
    'password'
  ),
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

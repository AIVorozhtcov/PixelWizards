import { SERVER_HOST } from './serverHost';

export const URLS = {
  base: 'https://ya-praktikum.tech/api/v2',
  resources: 'https://ya-praktikum.tech/api/v2/resources',
  api: `${SERVER_HOST}/api`,
} as const;

export const USER_PATHS = {
  updateProfile: '/user/profile',
  updateAvatar: '/user/profile/avatar',
  updatePassword: '/user/password',
} as const;

export const AUTH_PATHS = {
  signup: '/auth/signup',
  signin: '/auth/signin',
  logout: '/auth/logout',
  getUserInfo: '/auth/user',
} as const;

export const FORUM_PATHS = {
  register: '/users/register',
  login: '/users/login',
  checkToken: '/users/token',
  topics: '/topics',
  comments: '/comments',
  reply: '/reply',
} as const;

export const IMETHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

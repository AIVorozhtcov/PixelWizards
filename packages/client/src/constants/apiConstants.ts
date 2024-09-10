export const URLS = {
  base: 'https://ya-praktikum.tech/api/v2',
  resources: 'https://ya-praktikum.tech/api/v2/resources',
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

export const IMETHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

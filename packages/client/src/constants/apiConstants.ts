export const URLS = {
  base: 'https://ya-praktikum.tech/api/v2',
  resources: 'https://ya-praktikum.tech/api/v2/resources',
};

export const USER_PATHS = {
  updateProfile: '/user/profile',
  updateAvatar: '/user/profile/avatar',
  updatePassword: '/user/password',
} as const;

export const HEADERS = {
  CT_APPLICATION_JSON: { 'Content-Type': 'application/json' },
  ACCEPT: { Accept: 'application/json' },
};

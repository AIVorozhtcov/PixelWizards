import '../../client.d';

export const SERVER_HOST =
  typeof window === 'undefined'
    ? 'http://server:3001'
    : 'http://localhost:3001';
// export const SERVER_HOST =
//   typeof window === 'undefined'
//     ? __INTERNAL_SERVER_URL__
//     : __EXTERNAL_SERVER_URL__;

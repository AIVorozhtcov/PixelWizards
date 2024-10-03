import '../../client.d';

export const SERVER_HOST =
  typeof window === 'undefined'
    ? 'http://server:3001'
    : 'http://158.160.21.142:3001';
// export const SERVER_HOST =
//   typeof window === 'undefined'
//     ? __INTERNAL_SERVER_URL__
//     : __EXTERNAL_SERVER_URL__;

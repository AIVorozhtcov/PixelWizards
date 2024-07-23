const LINKS = {
  notfound: '*',
  home: '/',
  login: '/login',
  registration: '/registration',
  game: '/game',
  profile: '/profile',
  leaderboard: '/leaderboard',
  forum: '/forum',
  topic: '/topic/:id',
  serverErrorPage: '/500',
} as const;

export default LINKS;

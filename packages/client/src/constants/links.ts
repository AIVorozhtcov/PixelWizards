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
} as const;

export default LINKS;

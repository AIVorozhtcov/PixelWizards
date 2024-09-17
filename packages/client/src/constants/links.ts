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
  test: '/test',
  selfRedirect: 'http://localhost:3000',
} as const;

export default LINKS;

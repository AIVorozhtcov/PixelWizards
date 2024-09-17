const LINKS = {
  notfound: '*',
  home: '/',
  login: '/login',
  registration: '/registration',
  game: '/game',
  profile: '/profile',
  leaderboard: '/leaderboard',
  forum: '/forum',
  forumLogin: '/forum/login',
  forumRegistration: '/forum/registration',
  forumTopic: '/forum/topic/:id',
  serverErrorPage: '/500',
  test: '/test',
  selfRedirect: 'http://localhost:3000',
} as const;

export default LINKS;

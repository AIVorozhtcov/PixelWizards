import LINKS from './links';

interface ArrayOfLinks {
  name: string;
  href: Partial<typeof LINKS[keyof typeof LINKS]>;
}

const arrayOfLinks: ArrayOfLinks[] = [
  {
    name: 'Главная',
    href: '/',
  },
  {
    name: 'Профиль',
    href: '/profile',
  },
  {
    name: 'Форум',
    href: '/forum',
  },
  {
    name: 'Таблица лидеров',
    href: '/leaderboard',
  },
];

export default arrayOfLinks;

import { createLink } from '../utils/helpers';
import LINKS from './links';

const arrayOfLinks = [
  createLink('Главная', LINKS.home),
  createLink('Профиль', LINKS.profile),
  createLink('Форум', LINKS.forum),
  createLink('Таблица лидеров', LINKS.leaderboard),
];

export default arrayOfLinks;

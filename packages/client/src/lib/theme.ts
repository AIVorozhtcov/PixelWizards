import { THEMES, THEME_STORAGE_KEY } from '../constants/themeConstants';
import { ThemeType } from '../types';

export const getThemeFromStorage = () => {
  let theme = localStorage.getItem(THEME_STORAGE_KEY);

  if (!theme) {
    setThemeInStorage('dark');
    theme = THEMES.dark;
  }

  return theme as ThemeType;
};

export const setThemeInStorage = (theme: ThemeType) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

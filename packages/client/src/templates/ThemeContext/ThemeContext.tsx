import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from '../../types';
import { getThemeFromStorage, setThemeInStorage } from '../../lib/theme';
import { THEMES } from '../../constants/themeConstants';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  supportedThemes: { [key: string]: string };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Can not get context');
  }

  return context;
};

export const Theme = (props: { children: React.ReactNode }) => {
  const themeInStorage = getThemeFromStorage();
  const [theme, setTheme] = useState<ThemeType>(themeInStorage);

  useEffect(() => {
    setThemeInStorage(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes: THEMES,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const themeHandler = () => {
  const { theme, setTheme } = useTheme();

  if (theme === THEMES.dark) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
};

Theme.ThemeHandler = themeHandler;

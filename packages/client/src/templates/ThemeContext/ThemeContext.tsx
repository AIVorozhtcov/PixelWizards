import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from '../../types';
import { getThemeFromStorage, setThemeInStorage } from '../../lib/theme';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
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
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType } from '../../types';
import { getThemeFromStorage, setThemeInStorage } from '../../lib/theme';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const defaultContext: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context ?? defaultContext;
};

export const ThemeProvider = (props: { children: React.ReactNode }) => {
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

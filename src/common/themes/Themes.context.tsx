import React, {createContext, useEffect, useContext} from 'react';

import {atom, useRecoilState} from 'recoil';

import {loadTheme} from './themes';
import {ThemeContextProps, ThemeName} from './Themes.types';
import useLocalStorage from 'common/hooks/useLocalStorage/useLocalStorage';

const THEME_LS_KEY = 'polyfolio_theme';
const THEME_STATE_KEY = 'polyfolio_theme_state';

const ThemeContext = createContext<ThemeContextProps>(null);
export const useThemeContext = () => useContext(ThemeContext);

function ThemeContextProvider({children}: {children: React.ReactNode}) {
  const [persistedTheme, setPersistedTheme] = useLocalStorage<ThemeName>(THEME_LS_KEY, null);
  const themePersistState = atom({
    key: THEME_STATE_KEY,
    default: persistedTheme,
  });

  const [theme, setTheme] = useRecoilState(themePersistState);

  useEffect(() => {
    const currentTheme: ThemeName = theme ?? ThemeName.Dark;

    setPersistedTheme(currentTheme);
    loadTheme(currentTheme);
  }, [setPersistedTheme, theme]);

  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;

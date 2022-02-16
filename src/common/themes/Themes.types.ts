import {Dispatch, SetStateAction} from 'react';

enum ThemeName {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeContextProps {
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
}

export {ThemeName, ThemeContextProps};

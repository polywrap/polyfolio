import {Dispatch, SetStateAction} from 'react';

export enum ThemeName {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeContextProps {
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
}

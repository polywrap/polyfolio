import lightTheme from './light/index';
import darkTheme from './dark/index';

import _forOwn from 'lodash/forOwn';
import _isObject from 'lodash/isObject';
import _keysIn from 'lodash/keysIn';

import {ThemeName} from './Themes.types';

const themes: Record<ThemeName, unknown> = {
  [ThemeName.Light]: lightTheme,
  [ThemeName.Dark]: darkTheme,
};

export function loadTheme(name: ThemeName): void {
  function loadValues(themeObject: unknown) {
    _forOwn(themeObject, (value, key) => {
      if (_isObject(value)) {
        loadValues(value);
      } else {
        const cssKey = `--${key}`;
        document.body.style.setProperty(cssKey, value);
      }
    });
  }

  loadValues(themes[name]);

  for (const themeName of Object.values(ThemeName)) {
    document.body.classList.remove(`${themeName}-theme`);
  }

  document.body.classList.add(`${name}-theme`);
}

export const themesNames = _keysIn(themes);

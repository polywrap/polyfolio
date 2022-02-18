import React, {useCallback} from 'react';
import classNames from 'classnames';

import styles from './ThemeSwitcher.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import {ThemeName} from 'common/themes/Themes.types';
import {useThemeContext} from 'common/themes/Themes.context';

function ThemeSwitcher({className = ''}: {className?: string}) {
  const {theme, setTheme} = useThemeContext();
  const handleThemeSwitch = useCallback(() => {
    setTheme(theme === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark);
  }, [setTheme, theme]);

  return (
    <div
      className={classNames(styles.common_theme_switcher, styles[theme], className)}
      onClick={handleThemeSwitch}
    >
      <Icon src={theme === ThemeName.Dark ? iconsObj.moon : iconsObj.sun} className={styles.icon} />
      <div className={styles.circle} />
    </div>
  );
}

export default ThemeSwitcher;

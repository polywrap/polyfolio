import React, {Dispatch} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './HeaderInfoMenu.module.scss';

import {menuItems} from './HeaderInfoMenu.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import {HeaderInfoMenuItem} from './HeaderInfoMenu.types';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function HeaderInfoMenu({onClick}: {onClick: Dispatch<HeaderInfoMenuItem>}) {
  const theme = useTheme();
  const translation = useTranslation();

  const MenuItem = (menuItem: HeaderInfoMenuItem) => {
    return (
      <>
        {!menuItem.isDivider ? (
          <div className={styles.menu_item} onClick={() => onClick(menuItem)}>
            <MaskIcon size={'18px'} src={menuItem.icon} className={styles.icon} />
            <div className={styles.title}>{translation.HeaderInfoMenu[menuItem.title]}</div>
          </div>
        ) : (
          <div className={styles.divider} />
        )}
      </>
    );
  };

  return (
    <div className={classNames(styles.common_header_info_menu, styles[theme])}>
      {_map(menuItems, (menuItem) => (
        <MenuItem {...menuItem} key={menuItem.title} />
      ))}
    </div>
  );
}

export default HeaderInfoMenu;

import React, {Dispatch} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './LocalizationPickerInfo.module.scss';

import {menuItems} from './LocalizationPicker.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import {LocalizationPickerItem} from './LocalizationPicker.types';
import Icon from 'common/components/Icon/Icon';
import {useLanguageContext} from 'common/localization/Localization.context';
import iconsObj from 'assets/icons/iconsObj';

function LocalizationPickerInfo({onClick}: {onClick: Dispatch<LocalizationPickerItem>}) {
  const theme = useTheme();
  const {language} = useLanguageContext();

  const MenuItem = (menuItem: LocalizationPickerItem) => {
    return (
      <div className={styles.menu_item} onClick={() => onClick(menuItem)}>
        <div className={styles.menu_item}>
          <div className={styles.title}>{menuItem.title.toUpperCase()}</div>
          <div className={styles.secondaryTitle}>{menuItem.secondaryTitle}</div>
          {language === menuItem.title && (
            <div className={styles.iconCurrency}>
              <Icon src={iconsObj.selected} className={styles.iconSelected} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={classNames(styles.common_header_gas_info_menu, styles[theme])}>
      {_map(menuItems, (menuItem) => (
        <MenuItem {...menuItem} key={menuItem.title} />
      ))}
    </div>
  );
}

export default LocalizationPickerInfo;

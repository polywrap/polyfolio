import React, {Dispatch} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './NetworksPickerInfo.module.scss';

import {menuItems} from './NetworksPickerConfig';
import useTheme from 'common/hooks/useTheme/useTheme';
import {NetworksPickerItem} from './NetworksPickerItem.types';
import Icon from 'common/components/Icon/Icon';
import {useNetworks} from 'common/networks/Networks.context';
import iconsObj from 'assets/icons/iconsObj';

function NetworksPickerInfo({onClick}: {onClick: Dispatch<NetworksPickerItem>}) {
  const theme = useTheme();
  const {network} = useNetworks();

  const MenuItem = (menuItem: NetworksPickerItem) => {
    return (
      <div className={styles.menu_item} onClick={() => onClick(menuItem)}>
        <div className={styles.menu_item}>
          <div className={styles.title}>{menuItem.title.toUpperCase()}</div>
          <div className={styles.secondaryTitle}>
            {menuItem.title}
          </div>
          {network === menuItem.name && (
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

export default NetworksPickerInfo;

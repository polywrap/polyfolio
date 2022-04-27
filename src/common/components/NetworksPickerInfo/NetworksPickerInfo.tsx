import React, { Dispatch } from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './NetworksPickerInfo.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {INetworks} from 'common/networks/Networks.types';
import Icon from 'common/components/Icon/Icon';
import { useNetworks } from 'common/networks/Networks.context';
import iconsObj from 'assets/icons/iconsObj';

function NetworksPickerInfo({ onClick }: { onClick: Dispatch<INetworks> }) {
  const theme = useTheme();
  const {network} = useNetworks();

  const MenuItem = (menuItem: INetworks) => {
    return (
      <label className={styles.menu_item} onClick={() => onClick(menuItem)}>
        <div className={styles.menu_item}>
          <div className={styles.icon}>
            <Icon src={iconsObj.ethereum} className={styles.iconSelected} />
          </div>
          <div className={styles.secondaryTitle}>
            {menuItem.title}
          </div>
          {menuItem.checked && (
            <div className={styles.iconCurrency}>
              <Icon src={iconsObj.checkedIcon} className={styles.iconSelected} />
            </div>
          )}
        </div>
        <input type='checkbox' id={menuItem.name}/>
      </label>
    );
  };

  return (
    <div className={classNames(styles.common_header_gas_info_menu, styles[theme])}>
      {_map(network, (networkItem) => (
        <MenuItem {...networkItem} key={networkItem.chainId} />
      ))}
    </div>
  );
}

export default NetworksPickerInfo;

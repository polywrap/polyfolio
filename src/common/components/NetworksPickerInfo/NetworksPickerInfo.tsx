import React, {Dispatch} from 'react';
import classNames from 'classnames';

import styles from './NetworksPickerInfo.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {Network} from 'common/types';
import Icon from 'common/components/Icon/Icon';
import {useNetworks} from 'common/networks/Networks.context';
import iconsObj from 'assets/icons/iconsObj';

import SUPPORTED_NETWORKS from '../../networks/Networks.config';

function NetworksPickerInfo({onClick}: {onClick: Dispatch<Network>}) {
  const theme = useTheme();
  const {networks} = useNetworks();

  return (
    <div className={classNames(styles[theme], styles.common_header_gas_info_menu)}>
      {SUPPORTED_NETWORKS.map((network) => (
        <MenuItem
          key={network.chainId}
          network={network}
          selected={networks.map((n) => n.name).includes(network.name)}
          disabled={networks.length === 1}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

function MenuItem({
  network,
  selected,
  disabled = false,
  onClick,
}: {
  network: Network;
  selected: boolean;
  disabled?: boolean;
  onClick: Dispatch<Network>;
}) {
  return (
    <label className={styles.menu_item} onClick={() => onClick(network)}>
      <div className={styles.menu_item}>
        <div className={styles.icon}>
          <Icon src={network['icon']} className={styles.iconSelected} />
        </div>
        <div className={styles.secondaryTitle}>{network.title}</div>
        {selected ? (
          <div className={styles.iconCurrency}>
            <Icon src={iconsObj.checkedIcon} className={classNames(styles.iconSelected, disabled ? styles.iconDisable: '')} />
          </div>
        ) : (
          <div className={styles.iconCurrency}>
            <div className={styles.checkbox} />
          </div>
        )}
      </div>
      <input type="checkbox" id={network.name} />
    </label>
  );
}

export default NetworksPickerInfo;

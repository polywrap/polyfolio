import React, { useState, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import styles from './NetworksPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import NetworksPickerInfo from '../NetworksPickerInfo/NetworksPickerInfo';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import {useNetworks} from 'common/networks/Networks.context';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import {networks} from './NetworksPicker.config';
import {INetworks} from 'common/networks/Networks.types';
import Icon from 'common/components/Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';

function NetworksPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {network, setNetwork} = useNetworks();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleNetworkChange = useCallback((menu_item) => {
    setNetwork(network.map(networkItem =>
      networkItem.name === menu_item.name
        ? {...networkItem, checked: !networkItem.checked}
        : networkItem
    ))
  }, [network, setNetwork])

  const name = useMemo(() => {
    let status: string;

    if (network) {
      network.forEach((netItem: INetworks) => netItem.checked ? status = netItem.name : '')
    }

    return status;
  }, [network])

  return (
    <div ref={ref} className={classNames(styles[theme], styles.NetworksPicker, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={<NetworksPickerInfo onClick={handleNetworkChange} />}
      >
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.common_currency_picker, styles[theme], className)}
        >
          <Icon src={iconsObj.ethereum} className={styles.icon} />
          <span className={styles.currency}>{networks[name].name}</span>
          <MenuArrow startPosition={!isOpen ? 'right' : 'left'} className={styles.menu_arrow} filled />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default NetworksPicker;

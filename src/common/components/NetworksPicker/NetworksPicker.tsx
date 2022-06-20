import React, {useState, useRef, useCallback} from 'react';
import classNames from 'classnames';

import styles from './NetworksPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import NetworksPickerInfo from '../NetworksPickerInfo/NetworksPickerInfo';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import {useNetworks} from 'common/networks/Networks.context';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import SUPPORTED_NETWORKS from '../../networks/Networks.config';

function NetworksPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {networks, setNetworks} = useNetworks();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleToggleNetwork = useCallback(
    (menu_item) => {
      const selected = networks.find((n) => n.name === menu_item.name);

      if (selected) {
        if (networks.length === 1) return; // prevent deselection of last network
        setNetworks(networks.filter((n) => n.name !== menu_item.name));
      } else {
        console.log('not selected')
        setNetworks([...networks, SUPPORTED_NETWORKS.find((n) => n.name === menu_item.name)]);
      }
    },
    [networks, setNetworks],
  );

  return (
    <div ref={ref} className={classNames(styles[theme], styles.NetworksPicker, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={<NetworksPickerInfo onClick={handleToggleNetwork} />}
      >
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.common_currency_picker, styles[theme], className)}
        >
          <span className={styles.currency}>
            Networks - {networks.length}/{Object.keys(SUPPORTED_NETWORKS).length}
          </span>
          <MenuArrow
            startPosition={!isOpen ? 'right' : 'down'}
            className={styles.menu_arrow}
            filled
          />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default NetworksPicker;

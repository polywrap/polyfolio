import React, {useState, useRef, useCallback, useMemo} from 'react';
import classNames from 'classnames';

import styles from './NetworksPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import NetworksPickerInfo from '../NetworksPickerInfo/NetworksPickerInfo';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import {useNetworks} from 'common/networks/Networks.context';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import SUPPORTED_NETWORKS from './NetworksPicker.config';

function NetworksPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {networks, setNetworks} = useNetworks();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleNetworkChange = useCallback(
    (menu_item) => {
      setNetworks(
        networks.map((networkItem) =>
          networkItem.name === menu_item.name
            ? {...networkItem, checked: !networkItem.checked}
            : networkItem,
        ),
      );
    },
    [networks, setNetworks],
  );

  const netChosenQuantity = useMemo(() => {
    let quantity = 0;
    networks?.forEach((n) => (n.checked ? quantity++ : {}));

    return quantity;
  }, [networks]);

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
          <span className={styles.currency}>
            Networks - {netChosenQuantity}/{Object.keys(SUPPORTED_NETWORKS).length}
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

import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

import styles from './NetworksPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import NetworksPickerInfo from '../NetworksPickerInfo/NetworksPickerInfo';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import {useNetworks} from 'common/networks/Networks.context';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import {networks} from './NetworksPicker.config';

function NetworksPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {network, setNetworks} = useNetworks()
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleMenuItemClicked = useCallback(
    (item) => {
      setIsOpen(false);
      setNetworks(item.title);
    },
    [setNetworks],
  );

  return (
    <div ref={ref} className={classNames(styles.common_header_gas_info, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={<NetworksPickerInfo onClick={handleMenuItemClicked} />}
      >
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.common_currency_picker, styles[theme], className)}
        >
          <span className={styles.currency}>{networks[network].name}</span>
          <MenuArrow startPosition={!isOpen ? 'down' : 'up'} />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default NetworksPicker;

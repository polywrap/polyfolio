import React, {useState, useRef, useCallback} from 'react';
import classNames from 'classnames';

import styles from './Gas.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import HeaderGasInfoMenu from 'common/components/HeaderGasInfoMenu/HeaderGasInfoMenu';

function Gas({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleMenuItemClicked = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div ref={ref} className={classNames(styles.common_header_gas_info, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={
          <div onClick={() => {}}>
            <HeaderGasInfoMenu onClick={handleMenuItemClicked} />
          </div>
        }
      >
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.common_gas, styles[theme], className)}
        >
          <MaskIcon size={'15px'} src={iconsObj.gas} className={styles.icon} />
          <span className={styles.gas}>{'78'}</span>
          <MenuArrow startPosition={!isOpen ? 'down' : 'up'} />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default Gas;

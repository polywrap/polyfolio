import React, {useState, useRef, useCallback} from 'react';
import classNames from 'classnames';

import styles from './HeaderInfo.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import HeaderInfoMenu from 'common/components/HeaderInfoMenu/HeaderInfoMenu';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';

function HeaderInfo({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => isOpen && setIsOpen(false));

  const handleMenuItemClicked = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div ref={ref} className={classNames(styles.common_header_info, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={
          <div onClick={() => {}}>
            <HeaderInfoMenu onClick={handleMenuItemClicked} />
          </div>
        }
      >
        <div className={styles.content} onClick={() => setIsOpen(!isOpen)}>
          <MaskIcon size={'20px'} src={iconsObj.help} className={styles.icon} />
          <MenuArrow startPosition={!isOpen ? 'down' : 'up'} />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default HeaderInfo;

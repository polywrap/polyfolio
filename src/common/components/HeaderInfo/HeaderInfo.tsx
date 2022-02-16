import React, {useState, useRef, useCallback} from 'react';

import styles from './HeaderInfo.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import classNames from 'classnames';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import TooltipTrigger from '../TooltipTrigger/TooltipTrigger';
import HeaderInfoMenu from '../HeaderInfoMenu/HeaderInfoMenu';

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
          <div onClick={() => console.log('asd')}>
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

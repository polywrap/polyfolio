import React, {useState, DispatchWithoutAction, useEffect, useRef} from 'react';
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import classNames from 'classnames';

import styles from './MobileMenu.module.scss';

import Sidebar from '../Sidebar/Sidebar';
import useTheme from 'common/hooks/useTheme/useTheme';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';

function MobileMenu({isOpen, onClose}: {isOpen: boolean; onClose: DispatchWithoutAction}) {
  const theme = useTheme();
  const ref = useRef(null);

  useOnClickOutside(ref.current, () => onClose());
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(ref.current);
    }

    return () => clearAllBodyScrollLocks();
  }, [isOpen]);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      onClose();
    }
  }

  return (
    <div
      className={classNames(styles.common_mobile_menu, styles[theme], {
        [styles.common_mobile_menu_active]: isOpen,
      })}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div ref={ref}>
        <Sidebar className={styles.sidebar} />
      </div>
    </div>
  );
}

export default MobileMenu;

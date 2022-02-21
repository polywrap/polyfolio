import React, {useState, DispatchWithoutAction, useEffect, useRef} from 'react';
import classNames from 'classnames';
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';

import styles from './MobileSearch.module.scss';

import Input from '../Input/Input';
import Footer from '../Footer/Footer';
import iconsObj from 'assets/icons/iconsObj';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function MobileSearch({isOpen, onClose}: {isOpen: boolean; onClose: DispatchWithoutAction}) {
  const theme = useTheme();
  const ref = useRef(null);
  const translation = useTranslation();
  const [value, setValue] = useState<string>();

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
    if (touchStart - touchEnd < -150) {
      onClose();
    }
  }

  return (
    <div
      className={classNames(styles.common_mobile_search, styles[theme], {
        [styles.common_mobile_search_active]: isOpen,
      })}
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.container}>
        <div className={styles.title}>Search</div>
        <Input
          value={value}
          onChange={setValue}
          icon={iconsObj.search}
          wrapperClassName={styles.input}
          placeholder={translation.Common.searchPlaceholder}
        />
      </div>
      <Footer />
    </div>
  );
}

export default MobileSearch;

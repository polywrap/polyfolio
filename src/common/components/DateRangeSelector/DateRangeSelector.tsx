/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import styles from './DataRangeSelector.module.scss';
import {menuItems} from './DataRangeSelector.config';
import classNames from 'classnames';
import MenuArrow from '../MenuArrow/MenuArrow';
import _map from 'lodash/map';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import Icon from 'common/components/Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';

function DataRangeSelector({fontSize, className, isOpen, dataRange, setDataRange, setIsOpen}) {
  const translation = useTranslation();
  const theme = useTheme();
  const ref = useRef(null);
  useEffect(() => {
    setDataRange(menuItems[3]);
  }, []);
  useOnClickOutside(ref.current, () => setIsOpen(false));

  const MenuItem = (menuItem) => {
    return (
      <>
        {!menuItem.isDivider ? (
          <div className={styles.menu_item} onClick={() => setDataRange(menuItem)}>
            <div className={styles.title}>{translation.DataRangeSelector[menuItem.title]}</div>
            {dataRange?.id === menuItem?.id && (
              <Icon src={iconsObj.selected} className={styles.iconSelected} />
            )}
          </div>
        ) : (
          <div className={styles.divider} />
        )}
      </>
    );
  };

  const Menu = () => {
    return (
      <div className={styles.DataRangeSelectorContainer}>
        <span className={styles.titlePicker}>{translation.DataRangeSelector.title}</span>
        {_map(menuItems, (menuItem) => (
          <MenuItem {...menuItem} key={menuItem.id} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles[theme]} ref={ref}>
      <TooltipTrigger isOpen={isOpen} placement={'bottom-end'} popper={<Menu />}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{fontSize}}
          className={classNames(styles.btn, className)}
        >
          {translation.DataRangeSelector[dataRange?.title]}
          <MenuArrow className={styles.arrow} filled startPosition={!isOpen ? 'right' : 'up'} />
        </button>
      </TooltipTrigger>
    </div>
  );
}

export default DataRangeSelector;

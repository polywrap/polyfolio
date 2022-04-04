import React from 'react';
import _map from 'lodash/map';

import styles from './NetworkDropdown.module.scss';

import Icon from 'common/components/Icon/Icon';
import { NetworkDropdownItemConfig } from './NetworkDropdown.types';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import iconsObj from 'assets/icons/iconsObj';
import classNames from 'classnames';

const NetworkDropdownItem = (dropdownItem: NetworkDropdownItemConfig) => {
  return (
    <label>
      {dropdownItem?.icon && (
        <div className={styles.iconContainer}>
          <Icon src={dropdownItem.icon} className={styles.icon} />
        </div>
      )}
      <div>{[dropdownItem.title]}</div>
      <div className={styles.iconContainer}>
        <Icon src={dropdownItem.icon} className={styles.icon} />
      </div>
      <input type='checkbox' name={dropdownItem?.name} />
    </label>
  );
};

function NetworkDropdown({ array, current, isOpen, setIsOpen, onClick, className }) {
  return (
    <>
      <div className={`${styles.menu_item_dropdown} ${styles.dropdown}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.dropbtn, { [styles.showBtn]: isOpen })}
          type="button"
        >
          <div className={classNames(styles.menu_item_dropdown, styles.menu_item_dropdown_current)}>
            {current?.icon && <Icon src={current.icon} className={styles.icon} />}
            {current.title}
          </div>
          <MenuArrow className={className} filled startPosition={!isOpen ? 'right' : 'left'} />
        </button>
        <div className={classNames(styles.dropdown_content, { [styles.show]: isOpen })}>
          {_map(array, (dropdownItem) => (
            <div
              className={styles.menu_item_dropdown}
              key={dropdownItem.id}
            >
              <NetworkDropdownItem {...dropdownItem} onClick={onClick} key={dropdownItem.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default NetworkDropdown;

import React from 'react';
import _map from 'lodash/map';

import styles from './Dropdown.module.scss';

import Icon from 'common/components/Icon/Icon';
import {DropdownItemConfig} from './Dropdown.types';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import classNames from 'classnames';

const DropdownItem = (dropdownItem: DropdownItemConfig) => {
  return (
    <>
      <div>
        <Icon src={dropdownItem.icon} className={styles.icon} />
      </div>
      <div>{[dropdownItem.title]}</div>
    </>
  );
};

function Dropdown({array, current, isOpen, setIsOpen, onСhangeСurrency, className}) {
  return (
    <>
      <div className={`${styles.menu_item_dropdown} ${styles.dropdown}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.dropbtn, {[styles.showBtn]: isOpen})}
          type="button"
        >
          <div className={classNames(styles.menu_item_dropdown, styles.menu_item_dropdown_current)}>
            <Icon src={current.icon} className={styles.icon} />
            {current.title}
          </div>
          <MenuArrow className={className} filled startPosition={!isOpen ? 'right' : 'left'} />
        </button>
        <div className={classNames(styles.dropdown_content, {[styles.show]: isOpen})}>
          {_map(array, (dropdownItem) => (
            <button
              className={styles.menu_item_dropdown}
              onClick={() => onСhangeСurrency(dropdownItem)}
              type="button"
            >
              <DropdownItem {...dropdownItem} key={dropdownItem.id} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
export default Dropdown;

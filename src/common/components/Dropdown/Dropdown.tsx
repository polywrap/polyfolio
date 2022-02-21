import React from 'react';
import styles from './Dropdown.module.scss';
import {DropdownItemConfig} from './Dropdown.types';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import classNames from 'classnames';
import _map from 'lodash/map';

const DropdownItem = (dropdownItem: DropdownItemConfig) => {
  return (
    <>
      <div>
        <MaskIcon size={'20px'} src={dropdownItem.icon} className={styles.icon} />
      </div>
      <div>{[dropdownItem.title]}</div>
    </>
  );
};

function Dropdown({array, current, isOpen, setIsOpen, onСhangeСurrency}) {
  return (
    <>
      <div className={`${styles.menu_item_dropdown} ${styles.dropdown}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.dropbtn, {[styles.showBtn]: isOpen})}
          type="button"
        >
          <div className={classNames(styles.menu_item_dropdown, styles.menu_item_dropdown_current)}>
            <MaskIcon size={'20px'} src={current.icon} className={styles.icon} />
            {current.title}
          </div>
          <MenuArrow filled startPosition={!isOpen ? 'right' : 'left'} />
        </button>
        <div className={classNames(styles.dropdown_content, {[styles.show]: isOpen})}>
          {_map(array, (dropdownItem) => (
            <button
              className={styles.menu_item_dropdown}
              onClick={() => onСhangeСurrency(dropdownItem.id)}
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

import React from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './Dropdown.module.scss';

import Icon from 'common/components/Icon/Icon';
import {DropdownItemConfig} from './Dropdown.types';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import useTheme from 'common/hooks/useTheme/useTheme';

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

function Dropdown({array, current, isOpen, setIsOpen, onChangeCurrency}) {
  const theme = useTheme();

  return (
    <div className={classNames(styles.menu_item_dropdown, styles.dropdown, styles[theme])}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(styles.dropbtn, {[styles.showBtn]: isOpen})}
        type="button"
      >
        <div className={classNames(styles.menu_item_dropdown, styles.menu_item_dropdown_current)}>
          <Icon src={current.icon} className={styles.icon} />
          {current.title}
        </div>
        <MenuArrow filled startPosition={!isOpen ? 'right' : 'left'} />
      </button>
      <div className={classNames(styles.dropdown_content, {[styles.show]: isOpen})}>
        {_map(array, (dropdownItem) => (
          <button
            key={dropdownItem.id}
            className={styles.menu_item_dropdown}
            onClick={() => onChangeCurrency(dropdownItem.id)}
            type="button"
          >
            <DropdownItem {...dropdownItem} key={dropdownItem.id} />
          </button>
        ))}
      </div>
    </div>
  );
}
export default Dropdown;

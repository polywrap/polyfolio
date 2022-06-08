import React, {useState} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './HeaderGasInfoMenu.module.scss';

import {menuItems} from './HeaderGasInfoMenu.config';
import {dropdownItems} from './HederDropdown/HeaderDropdown.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import {HeaderGasInfoItem} from './HeaderGasInfoMenu.types';
import Dropdown from '../Dropdown/Dropdown';
import numberFormatter from 'utils/numberFormatter';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import {filteredDropdown} from 'utils/helpers';

function HeaderGasInfoMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState(dropdownItems[0]);
  const theme = useTheme();
  const translation = useTranslation();

  const MenuItem = (menuItem: HeaderGasInfoItem) => {
    return (
      <>
        {!menuItem.isDivider ? (
          <div className={styles.menu_item}>
            <div className={styles.menu_item_title}>
              <div style={{backgroundColor: menuItem.colorIcon}} className={styles.icon} />
              <div>
                <div className={styles.title}>{translation.HeaderGasInfoMenu[menuItem.title]}</div>
                <div className={styles.time}>{[menuItem.time]}</div>
              </div>
            </div>
            <div className={styles.price_container}>
              <div className={styles.title}>${numberFormatter(menuItem.price)}</div>
              <div className={styles.time}>{numberFormatter(menuItem.titlePrice)}</div>
            </div>
          </div>
        ) : (
          <div className={styles.divider} />
        )}
      </>
    );
  };

  const onChangeCurrency = (item) => {
    setCurrency(item);
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.common_header_gas_info_menu, styles[theme])}>
      <Dropdown
        array={filteredDropdown(dropdownItems, currency?.id)}
        onChangeCurrency={onChangeCurrency}
        className={styles.dropdownIcon}
        setIsOpen={setIsOpen}
        current={currency}
        isOpen={isOpen}
      />
      {_map(menuItems, (menuItem) => (
        <MenuItem {...menuItem} key={menuItem.title} />
      ))}
    </div>
  );
}

export default HeaderGasInfoMenu;

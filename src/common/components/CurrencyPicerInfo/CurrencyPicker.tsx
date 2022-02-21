import React, {Dispatch} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';

import styles from './CurrencyPickerInfo.module.scss';

import {menuItems} from './CurrencyPicker.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import {CurrencyPickerItem} from './CurrencyPicker.types';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import {useCurrency} from 'common/currency/Currency.context';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function CurrencyPickerInfo({onClick}: {onClick: Dispatch<CurrencyPickerItem>}) {
  const theme = useTheme();
  const {currency} = useCurrency();
  const translation = useTranslation();

  const MenuItem = (menuItem: CurrencyPickerItem) => {
    return (
      <div className={styles.menu_item} onClick={() => onClick(menuItem)}>
        <div className={styles.menu_item}>
          <MaskIcon size={'18px'} src={menuItem.icon} className={styles.icon} />
          <div className={styles.title}>{translation.Currency[menuItem.title]}</div>
          <div className={styles.secondaryTitle}>
            {translation.Currency[menuItem.secondaryTitle]}
          </div>
          {currency === menuItem.title && (
            <div className={styles.iconCurrency}>
              <MaskIcon size={'18px'} src={menuItem.icon} className={styles.icon} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={classNames(styles.common_header_gas_info_menu, styles[theme])}>
      {_map(menuItems, (menuItem) => (
        <MenuItem {...menuItem} key={menuItem.title} />
      ))}
    </div>
  );
}

export default CurrencyPickerInfo;

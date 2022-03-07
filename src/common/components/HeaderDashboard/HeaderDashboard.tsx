import React, {useState} from 'react';
import classNames from 'classnames';

import styles from './HeaderDashboard.module.scss';

import {dropdownItems} from './HederDashboardDropdown/HederDashboardDropdown.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import {content} from './HeaderDashboard.config';
import Dropdown from '../Dropdown/Dropdown';
import {filteredDropdown} from 'utils/helpers';
import numberFormatter from 'utils/numberFormatter';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function HeaderDashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState(dropdownItems[0]);
  const theme = useTheme();
  const translation = useTranslation();

  const onChangeCurrency = (item) => {
    setCurrency(item);
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.headerDashboardContainer, styles[theme])}>
      <h1 className={styles.title}>{translation.Dashboard.title}</h1>
      <div className={styles.contentContainer}>
        <div>
          <span className={styles.secondaryTitle}>{translation.Dashboard.secondaryTitle}</span>
          <h2>${numberFormatter({value: content.title, size: 2})}</h2>
          <div className={styles.secondaryValue}>
            <div className={styles.value}>
              +{numberFormatter({value: content.percent, size: 2})}%
            </div>
            <div className={classNames(styles.value, styles.percent)}>
              +${numberFormatter({value: content.value, size: 2})}
            </div>
          </div>
        </div>
        <div className={styles.dropdownContainer}>
          <Dropdown
            array={filteredDropdown(dropdownItems, currency?.id)}
            onСhangeСurrency={onChangeCurrency}
            className={styles.dropdownIcon}
            setIsOpen={setIsOpen}
            current={currency}
            isOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderDashboard;

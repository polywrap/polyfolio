import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import styles from './HeaderDashboard.module.scss';

import { dropdownItems } from './HederDashboardDropdown/HederDashboardDropdown.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import { content } from './HeaderDashboard.config';
import Dropdown from '../Dropdown/Dropdown';
import { filteredDropdown } from 'utils/helpers';
import numberFormatter from 'utils/numberFormatter';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import Skeleton from '../Skeleton/Skeleton';
import { useLocation } from 'react-router-dom';
import YounderProfile from '../YounderProfile/YounderProfile';

function HeaderDashboard() {
  const {pathname} = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState(dropdownItems[0]);
  const theme = useTheme();
  const translation = useTranslation();
  const formatedData = useGetData();
  const preparedData = formatedData();

  const younderAddress = useMemo(() => {
    const splitedUrl = pathname.split('/');

    if (splitedUrl.length > 2) {
      return splitedUrl[2].substring(0, 2) === '0x' ? splitedUrl[2] : '';
    } else return '';
  }, [pathname])

  const onChangeCurrency = (item) => {
    setCurrency(item);
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.headerDashboardContainer, styles[theme])}>
      {
        younderAddress 
          ? (
            <YounderProfile
              ens={younderAddress}
              address={younderAddress}
              style={styles.younder}
            />
          ) : (
            <h1 className={styles.title}>{translation.Dashboard.title}</h1>
          )
      }
      <div className={styles.contentContainer}>
        <div>
          <span className={styles.secondaryTitle}>{translation.Dashboard.secondaryTitle}</span>
          {
            preparedData['allAssetsSum']
              ? (
                <h2>${numberFormatter({ value: preparedData['allAssetsSum'], size: 2 })}</h2>
              )
              : <Skeleton width={215} height={54} />
          }
          <div className={styles.secondaryValue}>
            {
              content.percent
                ? (
                  <div className={styles.value}>
                    +{numberFormatter({ value: content.percent, size: 2 })}%
                  </div>
                )
                : (
                  <Skeleton width={40.5} height={19} />
                )
            }
            {
              content.value
                ? (
                  <div className={classNames(styles.value, styles.percent)}>
                    +${numberFormatter({ value: content.value, size: 2 })}
                  </div>
                )
                : (
                  <Skeleton width={35.6} height={19} />
                )
            }

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

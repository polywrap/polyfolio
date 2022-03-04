import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styles from './DashboardNavigation.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import RoutePath from 'common/modules/routing/routing.enums';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import {Tab} from './DashboardNavigation.config';

function DashboardNavigation() {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const translation = useTranslation();

  const theme = useTheme();

  useEffect(() => {
    if (pathname === RoutePath.Dashboard) {
      setActiveTab(Tab.portfolio);
    } else {
      setActiveTab(Tab.transactions);
    }
  }, []);

  return (
    <div className={classNames(styles.navigationContainer, styles[theme])}>
      <button
        onClick={() => navigate(RoutePath.Dashboard)}
        className={classNames(styles.portfolio, {
          [styles.notActive]: activeTab !== Tab.portfolio,
        })}
      >
        {translation.Dashboard.portfolio}
        <div
          className={classNames(styles.none, {
            [styles.notActive]: activeTab === Tab.portfolio,
          })}
        />
      </button>
      <button
        onClick={() => navigate(RoutePath.DashboardTransactions)}
        className={classNames(styles.transaction, {
          [styles.notActive]: activeTab !== Tab.transactions,
        })}
      >
        {translation.Dashboard.transactions}
        <div
          className={classNames(styles.none, {[styles.notActive]: activeTab === Tab.transactions})}
        />
      </button>
      <div className={styles.divider} />
    </div>
  );
}

export default DashboardNavigation;

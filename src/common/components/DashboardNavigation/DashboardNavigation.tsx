import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styles from './DashboardNavigation.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import RoutePath from 'common/modules/routing/routing.enums';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import {Tab} from './DashboardNavigation.config';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import {useRecoilValue} from 'recoil';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';

function DashboardNavigation() {
  const user = useRecoilValue(userPersistState);
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const translation = useTranslation();
  const search = useRecoilValue(searchPersistState);
  const theme = useTheme();

  const linkToDashboard = search
    ? replaceRouteParameters(RoutePath.Dashboard, {search})
    : replaceRouteParameters(RoutePath.Dashboard, {user});

  const linkToTransactions = search
    ? replaceRouteParameters(RoutePath.DashboardTransactions, {search})
    : replaceRouteParameters(RoutePath.DashboardTransactions, {user});

  useEffect(() => {
    if (pathname === linkToDashboard) {
      setActiveTab(Tab.portfolio);
    } else {
      setActiveTab(Tab.transactions);
    }
  }, [linkToDashboard, pathname]);

  return (
    <div className={classNames(styles.navigationContainer, styles[theme])}>
      <button
        onClick={() => navigate(linkToDashboard)}
        className={classNames(styles.portfolio, {
          [styles.notActive]: activeTab !== Tab.portfolio,
        })}
      >
        {translation.Dashboard.portfolio}
        <div
          className={classNames(styles.hidden, {
            [styles.notActive]: activeTab === Tab.portfolio,
          })}
        />
      </button>
      <button
        onClick={() => navigate(linkToTransactions)}
        className={classNames(styles.transaction, {
          [styles.notActive]: activeTab !== Tab.transactions,
        })}
      >
        {translation.Dashboard.transactions}
        <div
          className={classNames(styles.hidden, {
            [styles.notActive]: activeTab === Tab.transactions,
          })}
        />
      </button>
      <div className={styles.divider} />
    </div>
  );
}

export default DashboardNavigation;

import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styles from './DashboardNavigation.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import RoutePath from 'common/modules/routing/routing.enums';

function DashboardNavigation() {
  const [pageActive, setPageActive] = useState(false);
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const theme = useTheme();

  useEffect(() => {
    setPageActive(pathname.indexOf('portfolio') === -1);
  }, []);

  return (
    <div className={classNames(styles.navigationContainer, styles[theme])}>
      <button
        onClick={() => navigate(RoutePath.Dashboard)}
        className={classNames(styles.portfolio, {[styles.notActive]: pageActive})}
      >
        Portfolio
        <div className={classNames(styles.none, {[styles.notActive]: !pageActive})} />
      </button>
      <button
        onClick={() => navigate(RoutePath.DashboardTransactions)}
        className={classNames(styles.transaction, {[styles.notActive]: !pageActive})}
      >
        Transaction <div className={classNames(styles.none, {[styles.notActive]: pageActive})} />
      </button>
      <div className={styles.divider} />
    </div>
  );
}

export default DashboardNavigation;

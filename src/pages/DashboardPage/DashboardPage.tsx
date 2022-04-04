import React, { ReactNode, useEffect } from 'react';

import styles from './DashboardPage.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';
import useAuth from 'common/hooks/useAuth/useAuth';
import useBalance from 'common/hooks/useBalance/useBalance';

function DashboardPage({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const {user} = useAuth();
  const {getBalance} = useBalance();

  useEffect(function DashboardPage () {
    if (user) getBalance()
  }, [getBalance, user])

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header inputClassName={styles.input} />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          {children}
          <Footer wrapperClassName={styles.footer} />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;

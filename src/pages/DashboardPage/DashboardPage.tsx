import React, { ReactNode, useEffect } from 'react';

import styles from './DashboardPage.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';
import useData from 'common/hooks/useData/useData';

function DashboardPage({ children }: { children: ReactNode }) {
  const {balance} = useData();
  const theme = useTheme();

  console.log(balance)

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

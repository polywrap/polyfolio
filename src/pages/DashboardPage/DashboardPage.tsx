import React from 'react';

import styles from './DashboardPage.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';
import Networks from 'common/components/Networks/Networks';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import PerformanceTable from 'common/components/PerformanceTable/PerformanceTable';

function DashboardPage() {
  const theme = useTheme();

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header inputClassName={styles.input} />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <AssetsTable />
          <ProtocolsTable />
          <PerformanceTable />

          <Networks />
          <Footer wrapperClassName={styles.footer} />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;

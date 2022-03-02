import React from 'react';

import styles from './AssetPage.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import AssetsCharts from 'common/components/AssetsChart/AssetsChart';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';
import AssetOverview from 'common/components/AssetOverview/AssetOverview';
import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';

function AssetPage() {
  const theme = useTheme();

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header inputClassName={styles.input} />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <AssetsCharts />
            <AssetOverview />
            <AssetTransaction />
          </div>
          <Footer wrapperClassName={styles.footer} />
        </main>
      </div>
    </div>
  );
}

export default AssetPage;

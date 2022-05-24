import React from 'react';

import styles from './SettingsPage.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';
import SettingsBody from './SettingsBody/SettingsBody';

function SettingsPage() {
  const theme = useTheme();

  return (
    <div className={classNames(styles[theme])}>
      <Header />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <SettingsBody />
          </div>
          <Footer wrapperClassName={styles.footer} />
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;

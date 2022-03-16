import React from 'react';

import classNames from 'classnames';
import styles from './WrapperInfoPage.module.scss';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';

function WrapperInfoPage({children}) {
  const theme = useTheme();

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header inputClassName={styles.input} />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <div className={styles.wrapper}>{children}</div>
          <Footer wrapperClassName={styles.footer} />
        </main>
      </div>
    </div>
  );
}

export default WrapperInfoPage;

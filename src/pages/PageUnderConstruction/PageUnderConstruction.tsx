import React from 'react';

import styles from './PageUnderConstruction.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
//import Button from 'common/components/Button/Button';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function PageUnderConstruction() {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header
        className={classNames(styles.header, styles.header_content)}
        inputClassName={styles.input}
      />

      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.title_colored}>{translation.PageUnderConstruction.title}</span> -{' '}
          {translation.PageUnderConstruction.titleDescription}
        </h1>
        <div className={styles.subtitle}>
          <p>{translation.PageUnderConstruction.subtitle}</p>
          <p>{translation.PageUnderConstruction.subtitleAdditional}</p>
        </div>
        {/* <Button onClick={() => connect()} title={translation.PageUnderConstruction.button} size={'large'} /> */}
      </div>

      <Footer wrapperClassName={styles.footer} />
    </div>
  );
}

export default PageUnderConstruction;

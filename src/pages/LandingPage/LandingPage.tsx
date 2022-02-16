import React from 'react';

import styles from './LandingPage.module.scss';

import Header from 'common/components/Header/Header';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import Button from 'common/components/Button/Button';

function LandingPage() {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header
        className={classNames(styles.header, styles.header_content)}
        inputClassName={styles.input}
      />

      <div className={styles.container}>
        <h1>
          <span className={styles.title}>{translation.LandingPage.title}</span> -{' '}
          {translation.LandingPage.titleDescription}
        </h1>
        <div className={styles.subtitle}>
          <p>{translation.LandingPage.subtitle}</p>
          <p>{translation.LandingPage.subtitleAdditional}</p>
        </div>
        <Button title={translation.LandingPage.button} size={'large'} />
      </div>
    </div>
  );
}

export default LandingPage;

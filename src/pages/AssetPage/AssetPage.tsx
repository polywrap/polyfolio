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
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import { NavLink } from 'react-router-dom';
import Icon from 'common/components/Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';

function AssetPage() {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header inputClassName={styles.input} />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div>
              <div>
                <NavLink className={styles.link} to='/dashboard'>
                  <div className={styles.arrow_container}>
                    <Icon src={iconsObj.backArrow} className={styles.arrow} />
                  </div>
                  {translation.Common.linkBackToDashboard}
                </NavLink>
              </div>
              <div className={styles.title}>
                <Icon src={iconsObj.assetsToken} className={styles.img} />
                <div className={styles.text}>
                  {translation.Assets.grtSecondary}
                  <span>{translation.Assets.grt}</span>
                </div>
              </div>
            </div>
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

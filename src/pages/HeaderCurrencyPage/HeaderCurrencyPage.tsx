import React from 'react';
import styles from './HeaderCurrencyPage.module.scss';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import {useParams, useNavigate} from 'react-router-dom';
import useAssets from 'common/components/AssetsTable/AssetsTableItem/AssetsTableItem.config';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import _find from 'lodash/find';
import useSearch from 'common/hooks/useSearch/useSearch';

function HeaderCurrencyPage() {
  const theme = useTheme();
  const {asset} = useParams();
  const {search} = useSearch();
  const translation = useTranslation();
  const navigate = useNavigate();
  const menuItems = useAssets();
  const currency = _find(menuItems, {symbol: asset});

  const to = search ? RoutePath.Dashboard.replace(':user', search) : RoutePath.BaseRoute;

  return (
    <div className={classNames(styles.headerContainer, styles[theme])}>
      <button onClick={() => navigate(to)} className={styles.backBtn}>
        <Icon src={iconsObj.backArrow} className={styles.backArrow} />
        <div className={styles.btnText}>{translation.Buttons.backDashboard}</div>
      </button>
      <div className={styles.titleContainer}>
        <Icon src={currency?.iconInfoPage} className={styles.icon} />
        <h1 className={styles.title}>{currency?.secondaryTitle}</h1>
        <h4 className={styles.secondaryTitle}>{currency?.title}</h4>
      </div>
    </div>
  );
}
export default HeaderCurrencyPage;

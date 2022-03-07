import React from 'react';
import styles from './HeaderCurrencyPage.module.scss';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import {useParams, useNavigate} from 'react-router-dom';
import {menuItems} from 'common/components/AssetsTable/AssetsTableItem/AssetsTableItem.config';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {findById} from 'utils/helpers';

function HeaderCurrencyPage() {
  const theme = useTheme();
  const {id} = useParams();
  const translation = useTranslation();
  const navigate = useNavigate();
  const currency = findById(menuItems, id);

  return (
    <div className={classNames(styles.headerContainer, styles[theme])}>
      <button onClick={() => navigate(RoutePath.Dashboard)} className={styles.backBtn}>
        <Icon src={iconsObj.backArrow} className={styles.backArrow} />
        <div className={styles.btnText}>{translation.Buttons.backDashboard}</div>
      </button>
      <div className={styles.titleContainer}>
        <Icon src={currency?.icon} className={styles.icon} />
        <h1 className={styles.title}>{translation.Assets[currency?.secondaryTitle]}</h1>
        <h4 className={styles.secondaryTitle}>{translation.Assets[currency?.title]}</h4>
      </div>
    </div>
  );
}
export default HeaderCurrencyPage;

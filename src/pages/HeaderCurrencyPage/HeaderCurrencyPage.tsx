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
import replaceRouteParameters from 'utils/replaceRouteParameters';
import Skeleton from 'common/components/Skeleton/Skeleton';
import {useRecoilValue} from 'recoil';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {useBalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import useAsset from 'common/hooks/useAsset/useAsset';
import {AssetData} from 'common/types';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';

function HeaderCurrencyPage({asset}: {asset: AssetData}) {
  const theme = useTheme();
  const search = useRecoilValue(searchPersistState);
  const translation = useTranslation();
  const navigate = useNavigate();
  const assetMetadata = useAssetMetadata(asset?.network, asset?.chainId, asset?.tokenAddress);

  const to = search ? replaceRouteParameters(RoutePath.Dashboard, {search}) : RoutePath.BaseRoute;

  return (
    <div className={classNames(styles.headerContainer, styles[theme])}>
      <button onClick={() => navigate(to)} className={styles.backBtn}>
        <Icon src={iconsObj.backArrow} className={styles.backArrow} />
        <div className={styles.btnText}>{translation.Buttons.backDashboard}</div>
      </button>
      <div className={styles.titleContainer}>
        {assetMetadata ? (
          <Icon src={assetMetadata?.image.large} className={styles.icon} />
        ) : (
          <Skeleton width={40} height={40} style={{borderRadius: '50%'}} />
        )}
        <h1 className={styles.title}>{asset?.secondaryTitle}</h1>
        <h4 className={styles.secondaryTitle}>{asset?.title}</h4>
      </div>
    </div>
  );
}
export default HeaderCurrencyPage;

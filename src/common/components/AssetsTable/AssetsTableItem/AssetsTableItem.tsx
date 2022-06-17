import React from 'react';
import styles from './AssetsTableItem.module.scss';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import {useNavigate} from 'react-router-dom';

import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';
import PricesValue from 'common/components/PricesValue/PricesValue';
import _map from 'lodash/map';
import classNames from 'classnames';
import {fillArray} from 'utils/helpers';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import {networkToChainId} from 'utils/constants';
import RoutePath from 'common/modules/routing/routing.enums';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import Skeleton from 'common/components/Loaders/Skeleton';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {useRecoilValue} from 'recoil';
import {userPersistState} from 'common/modules/atoms/userAddress';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import {AssetData} from 'common/types';
import getAssetPageData from 'common/hooks/useAssetPageData/useAssetPageData';
import {useCurrency} from 'common/currency/Currency.context';
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';

interface AssetTableItemProps {
  asset: AssetData;
  dateRange: DataRangeSelectorItem;
}

function AssetsItem({asset, dateRange}: AssetTableItemProps) {
  const {filters} = useFiltersTables();
  const translation = useTranslation();
  const user = useRecoilValue(userPersistState);
  const navigate = useNavigate();
  const {
    valueSecondaryTitle,
    secondaryTitle,
    priceTitle,
    valueTitle,
    percent,
    title,
    link,
    network,
    symbol,
    chainId,
    tokenAddress,
  } = asset;
  const search = useRecoilValue(searchPersistState);
  const path =
    symbol && !search
      ? replaceRouteParameters(link, {chainId: networkToChainId[network], asset: symbol, user})
      : search
      ? replaceRouteParameters(link, {chainId: networkToChainId[network], asset: symbol, search})
      : RoutePath.NotFound;

  const assetMetaData = useAssetMetadata(network, chainId, tokenAddress);

  const {currency} = useCurrency();

  const assetPreparedData = getAssetPageData(
    currency,
    assetMetaData,
    priceTitle.toString(),
    dateRange,
  );

  const secondaryPricePercentTitle = assetPreparedData?.percentage ?? '';
  const pricePercentDollar = assetPreparedData?.pricePercentDollar ?? '';
  const valueIsMinus = assetPreparedData?.style === 'profit' ? false : true;

  const icon = assetMetaData?.image?.small;

  return (
    <>
      <button className={styles.buttonNavigate} onClick={() => navigate(path)}>
        <div className={styles.menu_item}>
          <div className={styles.title_container}>
            {icon ? (
              <Icon src={icon} className={styles.icon} />
            ) : (
              <Skeleton width={40} height={40} style={{borderRadius: '50%'}} />
            )}
            <div>
              <div className={styles.title}>{title}</div>
              <div className={styles.titleSecondary}>{secondaryTitle}</div>
            </div>
          </div>
          <div
            className={classNames(styles.container_allocation, {
              [styles.hidden]: filters.assets.allocation,
            })}
          >
            {_map(fillArray(100), (i) => {
              return (
                <div
                  key={i}
                  className={classNames(styles.aggregate, {
                    [styles.opacityAggregate]: i > percent,
                  })}
                />
              );
            })}
            <div className={styles.bg}>
              <span className={styles.badgeText}>
                {numberFormatter(percent, {minimumFractionDigits: 0})}%
              </span>
            </div>
          </div>
          <PricesValue
            secondaryPricePercentTitle={secondaryPricePercentTitle}
            pricePercentDollar={pricePercentDollar}
            className={classNames(styles.price_container, {
              [styles.hidden]: filters.assets.price,
            })}
            valueIsMinus={valueIsMinus}
            priceTitle={priceTitle}
          />
          <div
            className={classNames(styles.value_container, {
              [styles.hidden]: filters.assets.value,
            })}
          >
            <div>
              <div className={styles.valueTitle}>${numberFormatter(valueTitle)}</div>
              <div className={styles.valueSecondaryContainer}>
                {numberFormatter(valueSecondaryTitle)} {symbol.toUpperCase()}
                <div style={{marginLeft: '5px'}}>{translation.Assets[title]}</div>
              </div>
            </div>
            <MenuArrow className={styles.arrowIcon} startPosition="right" size="10px" />
          </div>
        </div>
      </button>
    </>
  );
}

export default AssetsItem;

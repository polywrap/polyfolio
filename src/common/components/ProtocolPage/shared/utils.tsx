import React from 'react';
import iconsObj from 'assets/icons/iconsObj';
import classNames from 'classnames';
import {rmCommasFromNum} from 'utils/helpers';
import {AssetComponentData, AssetData, Value} from './types';
import ComponentIcon from '../shared/ComponentIcon';
import styles from '../Vaults/VaultsTableItem/VaultsTableItem.module.scss';
import {CurrencySymbol} from 'common/currency/Currency.types';
import {toFixed} from 'utils/numberFormatter';

export const getPercentageStr = (asset: AssetData) => {
  const assetValue = Number(rmCommasFromNum(asset.value.amount.split('.')[0]));

  const percents = asset.components.map((component) => {
    const value = Number(rmCommasFromNum(component.value.amount.split('.')[0]));

    return (value / (assetValue / 100)).toFixed(2).toString() + '%';
  });

  return percents.join(' / ');
};

export const getAssetTitle = (components: AssetComponentData[]) => {
  switch (components.length) {
    case 1:
      return components[0].symbol;
    case 2:
      return `${components[0].symbol} ${components[1].symbol}`;
    default:
      return components.length + 'pool';
  }
};

export const getAssetValueStr = (assetValue: Value) =>
  `${CurrencySymbol[assetValue.currency]} ${toFixed(assetValue.amount, 2)}`;

export const getAssetIcons = (components: AssetComponentData[]) => {
  switch (components.length) {
    case 1:
    case 2:
    case 3:
      return components.map((component, index) => (
        <ComponentIcon
          key={component.address}
          tokenAddress={component.address}
          tokenNetwork={component.network}
          chainId={component.chainId}
          isLast={index === components.length - 1}
        />
      ));
    default:
      return (
        <>
          <ComponentIcon
            key={components[0].address}
            tokenAddress={components[0].address}
            tokenNetwork={components[0].network}
            chainId={components[0].chainId}
          />
          <>
            <div className={styles.icon_wrap}>
              <div className={classNames(styles.icon, styles.ghost_icon)}>
                +{components.length - 1}
              </div>
              <img src={iconsObj[components[0].network] as string} className={styles.networkIcon} />
            </div>
          </>
        </>
      );
  }
};

export const getBalanceStr = (components: AssetComponentData[], title: string) => {
  const balance = components
    .reduce((sum, component) => Number(component.balance) + sum, 0)
    .toFixed(0);

  return `${balance.toString()} ${title}`;
};

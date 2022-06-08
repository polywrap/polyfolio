import React from 'react';
import classNames from 'classnames';
import styles from './AssetBreakDownItems.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import {toFixed} from 'utils/numberFormatter';
import ComponentIcon from 'common/components/ProtocolPage/shared/ComponentIcon';
import {CurrencySymbol} from 'common/currency/Currency.types';
import {AssetComponentData} from 'common/components/ProtocolPage/shared/types';

export default function AssetBreakDownItem({
  network,
  chainId,
  address,
  symbol,
  balance,
  value,
}: AssetComponentData) {
  const theme = useTheme();

  return (
    <div className={classNames(styles[theme], styles.AssetBreakDownItem)}>
      <div className={styles.left}>
        <ComponentIcon tokenAddress={address} tokenNetwork={network} chainId={chainId} size={32} />
        <div className={styles.text}>
          <div className={styles.title}>{symbol}</div>
          <div className={styles.secondaryValue}>
            {CurrencySymbol[value.currency]} {toFixed(value.price, 2)}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          {CurrencySymbol[value.currency]} {toFixed(value.amount, 2)}
        </div>
        <div>{toFixed(balance, 2)}</div>
      </div>
    </div>
  );
}

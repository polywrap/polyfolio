import React from 'react';
import styles from './VaultsTableItem.module.scss';
import {toFixed} from 'utils/numberFormatter';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import classNames from 'classnames';
import {CurrencySymbol} from 'common/currency/Currency.types';
import {AssetData} from '../../shared/types';
import {getAssetIcons} from '../../shared/utils';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';

interface Props {
  asset: AssetData;
  onClick?: () => void;
}

function VaultsItem({asset, onClick}: Props) {
  const {components, balance, symbol} = asset;
  const {filters} = useFiltersTables();

  const icons = getAssetIcons(components);

  const balanceStr = `${balance} ${symbol}`; // TODO Symbol or combined components symbols  ?

  const valueStr = `${CurrencySymbol[asset.value.currency]} ${asset.value.amount}`;

  return (
    <>
      <button className={styles.buttonNavigate} onClick={onClick}>
        <div className={styles.menu_item}>
          <div className={styles.title_container}>
            <div className={styles.icons_container}>{icons}</div>
            <div>
              <div className={styles.title}>{asset.title}</div>
            </div>
          </div>
          <div
            className={classNames(styles.price_container, {
              [styles.hidden]: filters.vaults.value,
            })}
          >
            <div className={styles.title}>{balanceStr}</div>
          </div>
          <div
            className={classNames(styles.value_container, {
              [styles.hidden]: filters.vaults.claimable,
            })}
          >
            <div className={styles.title}>
              <div className={styles.valueTitle}>{toFixed(valueStr, 2)}</div>
            </div>
            <div className={styles.arrowIcon}>
              <MenuArrow startPosition="right" />
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default VaultsItem;

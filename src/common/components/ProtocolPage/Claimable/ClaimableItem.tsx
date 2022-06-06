import React from 'react';
import ComponentIcon from '../shared/ComponentIcon';
import {ClaimableData} from '../shared/types';
import styles from '../Vaults/VaultsTableItem/VaultsTableItem.module.scss';

type Props = {
  item: ClaimableData;
};

export default function ClaimableItem({item}: Props) {
  const {address, name, symbol, network, value, chainId} = item;

  return (
    <div className={styles.buttonNavigate}>
      <div className={styles.menu_item}>
        <div className={styles.title_container}>
          <div className={styles.icons_container}>
            <ComponentIcon tokenAddress={address} tokenNetwork={network} chainId={chainId} />
          </div>
          <div>
            <div className={styles.title}>{name}</div>
          </div>
        </div>
        {/*         <div className={styles.price_container}>
          <div className={styles.title}>
            {value} {symbol}
          </div>
        </div> */}
        <div className={styles.value_container}>
          <div className={styles.title}>
            <div className={styles.valueTitle}>
              {value} {symbol}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

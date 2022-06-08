import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import styles from '../Vaults/Vaults.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import {ProtocolData} from '../shared/types';
import ClaimableItem from './ClaimableItem';
import {CurrencySymbol} from 'common/currency/Currency.types';

interface Props {
  protocolData: ProtocolData;
}

function ClaimableTable({protocolData}: Props) {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();

  return !protocolData?.claimableRewards?.length ? (
    <div />
  ) : (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Claimable Rewards</h3>
        <div style={{display: 'flex', alignItems: 'center'}} className={styles.filter_container}>
          <h4>
            {CurrencySymbol[protocolData.claimableValue.currency]}{' '}
            {protocolData.claimableValue.amount}
          </h4>
          <div className={styles.minimize_container} onClick={() => setTableIsOpen(!tableIsOpen)}>
            <Icon src={iconsObj.filterIconSecondary} className={styles.minimize} />
          </div>
        </div>
      </div>
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Tables.asset}
          </div>
          <div className={classNames(styles.title, styles.price)}>
            {translation.Table.claimable}
          </div>
          <div className={classNames(styles.title, styles.price)}>{translation.Table.value}</div>
        </div>
        {protocolData.claimableRewards.map((claimable) => (
          <ClaimableItem key={claimable.name} item={claimable} />
        ))}
      </div>
    </div>
  );
}

export default ClaimableTable;

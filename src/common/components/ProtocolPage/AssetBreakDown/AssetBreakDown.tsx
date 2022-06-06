import React, {useEffect, useState} from 'react';

import classNames from 'classnames';
import styles from './AssetBreakDown.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import {toFixed} from 'utils/numberFormatter';
import AssetBreakDownItem from './AssetBreakDownItems/AssetBreakDownItems';
import Modal from 'react-modal';

import ComponentIcon from '../shared/ComponentIcon';
import {CurrencySymbol} from 'common/currency/Currency.types';
import { getPercentageStr } from '../shared/utils';
import { AssetData } from '../shared/types';

interface Props {
  asset: AssetData;
  onCloseModal: () => void;
}

export default function AssetBreakdown({asset, onCloseModal}: Props) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    onCloseModal && onCloseModal();
  };

  useEffect(() => {
    if (asset) {
      setIsOpen(true);
    }
  }, [asset]);

  const percentStr = getPercentageStr(asset);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className={classNames(styles[theme], styles.Modal)}
      overlayClassName={classNames(styles[theme], styles.Overlay)}
    >
      <div className={classNames(styles[theme], styles.AssetBreakDown)}>
        <div className={styles.mainTitle}>{asset.title} Asset Breakdown</div>
        <div className={styles.table}>
          <div className={styles.head}>
            <div className={styles.left}>
              <div className={styles.icons_container}>
                {asset.components.map((component) => (
                  <ComponentIcon
                    key={component.address}
                    tokenAddress={component.address}
                    tokenNetwork={component.network}
                    chainId={component.chainId}
                  />
                ))}
              </div>
              <div className={styles.text}>
                <div className={styles.title}>{asset.title}</div>
                <div className={styles.secondaryValue}>{percentStr}</div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.title}>
                {CurrencySymbol[asset.value.currency]} {toFixed(asset.value.amount, 2)}
              </div>
              <div className={classNames(styles.secondaryValue, styles.value)}>{asset.balance}</div>
            </div>
          </div>
          <div className={styles.body}>
            {asset.components.map((component) => (
              <AssetBreakDownItem key={asset.symbol} {...component} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

import React, {useEffect, useMemo, useState} from 'react';

import classNames from 'classnames';
import styles from './AssetBreakDown.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import numberFormatter from 'utils/numberFormatter';
import {mockData} from './AssetBreakDown.config';
import AssetBreakDownItem from './AssetBreakDownItems/AssetBreakDownItems';
import Icon from 'common/components/Icon/Icon';
import {IAssetBreakDownItem} from './AssetBreakDown.types';
import Modal from 'react-modal';

export default function AssetBreakdown({asset, onCloseModal}) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const percentString = useMemo(() => {
    let sum = 0;
    const totalAssetPrice = [];
    const totalAssetPercent = [];

    mockData.assets.forEach((asset: IAssetBreakDownItem) => {
      const price = Number(asset.price);
      const value = Number(asset.value);
      sum += price * value;
      totalAssetPrice.push(price * value);
    });

    totalAssetPrice.forEach((price: number) => {
      totalAssetPercent.push((100 * price) / sum);
    });

    const result = totalAssetPercent
      .map((percent: number) => Math.round(percent).toString() + '%')
      .join(' / ');

    return result;
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    onCloseModal && onCloseModal();
  };

  useEffect(() => {
    if (asset) {
      setIsOpen(true);
    }
  }, [asset]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className={classNames(styles[theme], styles.Modal)}
      overlayClassName={classNames(styles[theme], styles.Overlay)}
    >
      <div className={classNames(styles[theme], styles.AssetBreakDown)}>
        <div className={styles.mainTitle}>{mockData.title} Asset Breakdown</div>
        <div className={styles.table}>
          <div className={styles.head}>
            <div className={styles.left}>
              {mockData.assets.map((icon) => (
                <Icon key={icon?.symbol} src={icon?.icon} className={styles.icon} />
              ))}
              <div className={styles.text}>
                <div className={styles.title}>{mockData.title}</div>
                <div className={styles.secondaryValue}>{percentString}</div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.title}>${numberFormatter({value: 500, size: 2})}</div>
              <div className={classNames(styles.secondaryValue, styles.value)}>
                {numberFormatter({value: 500, size: 2})}
              </div>
            </div>
          </div>
          <div className={styles.body}>
            {mockData.assets.map((asset) => (
              <AssetBreakDownItem key={asset.symbol} {...asset} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

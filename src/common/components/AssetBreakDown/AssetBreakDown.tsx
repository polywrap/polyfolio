import React from 'react';

import classNames from 'classnames';
import styles from './AssetBreakDown.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import numberFormatter from 'utils/numberFormatter';
import { IAssetBreakDown } from './AssetBreakDown.types';

export default function AssetBreakdown ({
  title,
  assets,
}: IAssetBreakDown) {
  const theme = useTheme();

  return (
    <div className={classNames(styles[theme], styles.AssetBreakDown)}>
      <div className={styles.title}>
        {title} Asset Breakdown
      </div>
      <div className={styles.table}>
        <div className={styles.head}>
          <div>icons</div>
          <div>
            <div>{title}</div>
            <div></div>
          </div>
          <div>
            <div>{numberFormatter({value: 500, size: 2})}</div>
            <div>{numberFormatter({value: 500, size: 2})}</div>
          </div>
        </div>
        <div className={styles.body}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

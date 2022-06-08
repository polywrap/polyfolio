import React from 'react';
import styles from './AssetsChart.module.scss';
import Charts from '../Charts/Сharts';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import useAssetChartConfig from './AssetsChart.config';
import numberFormatter from 'utils/numberFormatter';
import {value} from './mocValue';
import _map from 'lodash/map';
import DataRangeSelector from '../DateRangeSelector/DateRangeSelector';
import Skeleton from '../Skeleton/Skeleton';

function AssetsCharts({changeDataRange, setIsOpen, isOpen, dataRange}) {
  const theme = useTheme();
  const item = useAssetChartConfig(dataRange);

  return (
    <div className={classNames(styles.assetsChartsContainer, styles[theme])}>
      <div className={styles.headerTable}>
        <div className={styles.title}>
          {item.title ? '$' + numberFormatter(item.title) : <Skeleton width={160} height={54} />}
        </div>
        <div className={styles.secondaryContainer}>
          <div className={classNames(styles.secondaryTittlePercent, styles[item.style])}>
            {item.secondaryTitlePercent ? (
              (item.style !== 'loss'
                ? '+' + numberFormatter(item.title)
                : '-' + numberFormatter(item.secondaryTitlePercent).substring(1)) + '%'
            ) : (
              <Skeleton width={60} height={19} />
            )}
          </div>
          <div className={classNames(styles.secondaryTittleDollar, styles[item.style])}>
            {item.secondaryTitleValue ? (
              item.style !== 'loss' ? (
                '+' + '$' + numberFormatter(item.secondaryTitleValue)
              ) : (
                '-' + '$' + numberFormatter(item.secondaryTitleValue).substring(1)
              )
            ) : (
              <Skeleton width={60} height={19} />
            )}
          </div>
          <DataRangeSelector
            setDataRange={changeDataRange}
            className={styles.button}
            dataRange={dataRange}
            setIsOpen={setIsOpen}
            fontSize="14px"
            isOpen={isOpen}
          />
        </div>
        <Charts opacity={0.1} opacityGradient={0.6} type="monotone" height="414px" />
      </div>
      <div className={styles.dataContainer}>
        {_map(value, (v) => (
          <div className={styles.dataStyle} key={v}>
            ${numberFormatter(v, {maximumFractionDigits: 4})}
            <div className={styles.decor} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AssetsCharts;

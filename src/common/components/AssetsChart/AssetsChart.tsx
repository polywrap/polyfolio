import React from 'react';
import styles from './AssetsChart.module.scss';
import Charts from '../Charts/Сharts';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import {item} from './AssetsChart.config';
import numberFormatter from 'utils/numberFormatter';
import MenuArrow from '../MenuArrow/MenuArrow';
import {value} from './mocValue';
import _map from 'lodash/map';

function AssetsCharts() {
  const theme = useTheme();

  return (
    <div className={classNames(styles.assetsChartsContainer, styles[theme])}>
      <div className={styles.headerTable}>
        <div className={styles.title}>${numberFormatter({value: item.title, size: 4})}</div>
        <div className={styles.secondaryContainer}>
          <div className={styles.secondaryTittlePercent}>
            +{numberFormatter({value: item.secondaryTitlePercent, size: 2})}%
          </div>
          <div className={styles.secondaryTittleDollar}>
            +${numberFormatter({value: item.secondaryTitleDollar, size: 2})}
          </div>
          <button className={styles.button}>
            1D
            <MenuArrow className={styles.arrow} filled startPosition="up" />
          </button>
        </div>
        <Charts opacity={0.1} opacityGradient={0.6} type="monotone" height="414px" />
      </div>
      <div className={styles.dataContainer}>
        {_map(value, (v) => (
          <div className={styles.dataStyle} key={v}>
            ${numberFormatter({value: v, size: 4})}
            <div className={styles.decor} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AssetsCharts;

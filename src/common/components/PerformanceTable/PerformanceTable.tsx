import React from 'react';
import styles from './performanceTable.module.scss';
import Charts from '../Charts/Сharts';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import {item} from './PerformanceItem.config';
import numberFormatter from 'utils/numberFormatter';
import MenuArrow from '../MenuArrow/MenuArrow';
import Icon from '../Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';

function PerformanceTable() {
  const theme = useTheme();

  return (
    <div className={classNames(styles.performanceContainer, styles[theme])}>
      <div className={styles.headerTable}>
        <button>
          <Icon src={iconsObj.filterIconSecondary} className={styles.iconSvg} />
        </button>
        <h4 className={styles.title}>Performance</h4>
        <button className={styles.button}>
          1D
          <MenuArrow className={styles.arrow} filled startPosition="up" />
        </button>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.title}>${numberFormatter({value: item.title, size: 2})}</div>
        <div className={styles.secondaryContainer}>
          <div className={styles.secondaryTittlePercent}>
            +{numberFormatter({value: item.secondaryTitlePercent, size: 2})}%
          </div>
          <div className={styles.secondaryTittleDollar}>
            +${numberFormatter({value: item.secondaryTitleValue, size: 2})}
          </div>
        </div>
      </div>
      <Charts opacity={0.6} opacityGradient={0.2} type="linear" height="200px" />
    </div>
  );
}
export default PerformanceTable;

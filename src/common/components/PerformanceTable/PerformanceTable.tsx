import React, {useState} from 'react';
import styles from './performanceTable.module.scss';
import Charts from '../Charts/Сharts';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import {item} from './PerformanceItem.config';
import numberFormatter from 'utils/numberFormatter';
import Icon from '../Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';
import DataRangeSelector from '../DateRangeSelector/DateRangeSelector';

function PerformanceTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [dataRange, setDataRange] = useState({});
  const theme = useTheme();

  const changeDataRange = (e) => {
    setDataRange(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(styles.performanceContainer, styles[theme])}>
      <div className={styles.headerTable}>
        <button>
          <Icon src={iconsObj.filterIconSecondary} className={styles.iconSvg} />
        </button>
        <h4 className={styles.title}>Performance</h4>
        <DataRangeSelector
          setDataRange={changeDataRange}
          className={styles.btn}
          setIsOpen={setIsOpen}
          dataRange={dataRange}
          isOpen={isOpen}
          fontSize="14px"
        />
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.title}>${numberFormatter(item.title)}</div>
        <div className={styles.secondaryContainer}>
          <div className={styles.secondaryTittlePercent}>
            +{numberFormatter(item.secondaryTitlePercent)}%
          </div>
          <div className={styles.secondaryTittleDollar}>
            +${numberFormatter(item.secondaryTitleValue)}
          </div>
        </div>
      </div>
      <Charts opacity={0.6} opacityGradient={0.2} type="linear" height="200px" />
    </div>
  );
}
export default PerformanceTable;

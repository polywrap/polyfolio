import React, {useState} from 'react';
import styles from './AssetsChart.module.scss';
import Charts from '../Charts/Сharts';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import {item} from './AssetsChart.config';
import numberFormatter from 'utils/numberFormatter';
import {value} from './mocValue';
import _map from 'lodash/map';
import DataRangeSelector from '../DateRangeSelector/DateRangeSelector';

function AssetsCharts() {
  const [isOpen, setIsOpen] = useState(true);
  const [dataRange, setDataRange] = useState({});
  const theme = useTheme();

  const changeDataRange = (e) => {
    setDataRange(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(styles.assetsChartsContainer, styles[theme])}>
      <div className={styles.headerTable}>
        <div className={styles.title}>${numberFormatter({value: item.title, size: 4})}</div>
        <div className={styles.secondaryContainer}>
          <div className={styles.secondaryTittlePercent}>
            +{numberFormatter({value: item.secondaryTitlePercent, size: 2})}%
          </div>
          <div className={styles.secondaryTittleDollar}>
            +${numberFormatter({value: item.secondaryTitleValue, size: 2})}
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
            ${numberFormatter({value: v, size: 4})}
            <div className={styles.decor} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AssetsCharts;

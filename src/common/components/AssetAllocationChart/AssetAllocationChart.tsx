import React, {useState} from 'react';
import classNames from 'classnames';
import styles from './AssetAllocationChart.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import {Item} from './AssetsAllocationChart.config';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import DataRangeSelector from '../DateRangeSelector/DateRangeSelector';
import numberFormatter from 'utils/numberFormatter';
import PieChartContainer from 'common/components/PieChart/PieChart';
import _find from 'lodash/find';
import _map from 'lodash/map';

function AssetAllocationChart() {
  const [current, setCurrent] = useState({...Item[0]});
  const [isOpen, setIsOpen] = useState(true);
  const [dataRange, setDataRange] = useState({});
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const translate = useTranslation();
  const theme = useTheme();
  const translation = useTranslation();
  const onClick = (current) => _find(Item, {id: current});

  const AssetItem = (item) => {
    return (
      <div className={styles.item} onClick={() => setCurrent(onClick(item?.id))}>
        <Icon src={item.icon} className={styles.icon} />
        <div className={styles.title}>{translation.Assets[item?.title]}</div>
        <div className={styles.value}>{numberFormatter(item?.value)}%</div>
      </div>
    );
  };

  const changeDataRange = (e) => {
    setDataRange(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(styles[theme], styles.chartContainer)}>
      <div className={classNames(styles.title_container, {[styles.hidden]: tableIsOpen})}>
        <button onClick={() => setTableIsOpen(!tableIsOpen)}>
          <Icon src={iconsObj.filterIconSecondary} className={styles.iconFilter} />
        </button>
        <h4 className={styles.title}>{translation.Charts.AssetAllocationTitle}</h4>
        <DataRangeSelector
          setDataRange={changeDataRange}
          className={styles.btn}
          setIsOpen={setIsOpen}
          dataRange={dataRange}
          isOpen={isOpen}
          fontSize="14px"
        />
      </div>
      <div className={classNames(styles.contentAnimation, {[styles.hidden]: tableIsOpen})}>
        <PieChartContainer innerRadius={32} outerRadius={72} item={Item} />
        <div className={styles.values}>
          <div className={styles.title}>{translate.Assets[current?.title]}</div>
          <div className={styles.value}>{numberFormatter(current?.value)}%</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.valuesContainer}>
          {_map(Item, (menuItem) => (
            <AssetItem {...menuItem} key={menuItem.title} />
          ))}
        </div>
        <button className={styles.viewAll}>{translate.Buttons.viewAll}</button>
      </div>
    </div>
  );
}

export default AssetAllocationChart;

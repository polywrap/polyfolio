import React, {useState} from 'react';
import classNames from 'classnames';
import {ResponsiveContainer} from 'recharts';
import styles from './AssetAllocationChart.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import {Item} from './AssetsAllocationChart.config';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import Button1D from '../Button1D/Button1D';
import numberFormatter from 'utils/numberFormatter';
import PieChartContainer from 'common/components/PieChart/PieChart';
import _find from 'lodash/find';
import _map from 'lodash/map';

function AssetAllocationChart() {
  const [current, setCurrent] = useState({...Item[0]});
  const translate = useTranslation();
  const theme = useTheme();
  const translation = useTranslation();
  const onClick = (current) => _find(Item, {id: current});

  const AssetItem = (item) => {
    return (
      <div className={styles.item} onClick={() => setCurrent(onClick(item?.id))}>
        <Icon src={item.icon} className={styles.icon} />
        <div className={styles.title}>{translation.Assets[item?.title]}</div>
        <div className={styles.value}>{numberFormatter({value: item?.value, size: 2})}%</div>
      </div>
    );
  };

  return (
    <div className={classNames(styles[theme], styles.chartContainer)}>
      <div className={styles.title_container}>
        <button>
          <Icon src={iconsObj.filterIconSecondary} className={styles.iconFilter} />
        </button>
        <h4 className={styles.title}>{translation.Charts.AssetAllocationTitle}</h4>
        <Button1D className={styles.btn} fontSize="14px" />
      </div>
      <PieChartContainer innerRadius={32} outerRadius={72} item={Item} />
      <div className={styles.values}>
        <div className={styles.title}>{translate.Assets[current?.title]}</div>
        <div className={styles.value}>{numberFormatter({value: current?.value, size: 2})}%</div>
      </div>
      <div className={styles.divider} />
      <div className={styles.valuesContainer}>
        {_map(Item, (menuItem) => (
          <AssetItem {...menuItem} key={menuItem.title} />
        ))}
      </div>
      <button className={styles.viewAll}>{translate.Buttons.viewAll}</button>
    </div>
  );
}

export default AssetAllocationChart;

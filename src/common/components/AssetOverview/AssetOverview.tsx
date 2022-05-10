import React from 'react';

import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import style from './AssetOverview.module.scss';
import useAssetOverviewData from './AssetOverview.config'
import {Row} from './components';
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';

function AssetOverview({dataRange}: {dataRange: DataRangeSelectorItem}) {
  const theme = useTheme()
  const dataOverview = useAssetOverviewData(dataRange);

  return (
    <div className={classNames(style[theme], style.overview)}>
      <div className={style.title}>Overview</div>
      <div className={style.block}>
        <Row items={dataOverview.row1Items} />
        <Row items={dataOverview.row2Items} />
      </div>
    </div>
  )
}

export default AssetOverview

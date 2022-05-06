import React from 'react';

import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import style from './AssetOverview.module.scss';
import { items, items2 } from './AssetOverview.config'
import { Row } from './components';

function AssetOverview() {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme], style.overview)}>
      <div className={style.title}>Overview</div>
      <div className={style.block}>
        <Row items={items} />
        <Row items={items2} />
      </div>
    </div>
  )
}

export default AssetOverview

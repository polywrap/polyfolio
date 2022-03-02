import React from 'react';

import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import style from './AssetOverview.module.scss';

function AssetOverview() {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme])}>
      <div className={style.title}>Overview</div>
      <div className={style.block}></div>
    </div>
  )
}

export default AssetOverview

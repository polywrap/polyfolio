import React from "react";

import classNames from "classnames";
import style from './AssetTransaction.module.scss';
import useTheme from "common/hooks/useTheme/useTheme";

function AssetTransaction() {
  const theme = useTheme()
  
  return (
    <div className={classNames(style[theme])}>
      <div className={style.title}>Transaction</div>
    </div>
  )
}

export default AssetTransaction

import React from "react";

import classNames from "classnames";
import style from './AssetTransaction.module.scss';
import useTheme from "common/hooks/useTheme/useTheme";
import { TableHeader } from "./components";

function AssetTransaction() {
  const theme = useTheme()
  
  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader />
    </div>
  )
}

export default AssetTransaction

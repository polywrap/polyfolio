import React from "react";

import classNames from "classnames";
import style from './AssetTransaction.module.scss';
import useTheme from "common/hooks/useTheme/useTheme";
import TableHeader from "../TableHeader/TableHeader";
import TableBlock from "../TableBlock/TableBlock";
import { data } from "./mock";

function AssetTransaction() {
  const theme = useTheme()
  
  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader />
      <TableBlock data={data} />
    </div>
  )
}

export default AssetTransaction

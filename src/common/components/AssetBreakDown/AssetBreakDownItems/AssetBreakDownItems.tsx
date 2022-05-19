import React, { useMemo } from "react";

import classNames from "classnames";
import Icon from "common/components/Icon/Icon";
import styles from './AssetBreakDownItems.module.scss';
import useTheme from "common/hooks/useTheme/useTheme";
import {IAssetBreakDownItem} from "../AssetBreakDown.types";
import numberFormatter from "utils/numberFormatter";

export default function AssetBreakDownItem ({
  icon,
  symbol,
  price,
  value,
}: IAssetBreakDownItem) {
  const theme = useTheme();

  const valuePrice = useMemo(() => Number(price) * Number(value), [price, value])
  
  return (
    <div className={classNames(styles[theme], styles.AssetBreakDownItem)}>
      <Icon src={icon} className={styles.icon} />
      <div>
        <div>{symbol}</div>
        <div>${numberFormatter({value: price, size: 2})}</div>
      </div>
      <div>
        <div>${numberFormatter({value: valuePrice, size: 2})}</div>
        <div>{numberFormatter({value, size: 2})}</div>
      </div>
    </div>
  )
}

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
      <div className={styles.left}>
        <Icon src={icon} className={styles.icon} />
        <div className={styles.text}>
          <div className={styles.title}>{symbol}</div>
          <div className={styles.secondaryValue}>${numberFormatter({value: price, size: 2})}</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>${numberFormatter({value: valuePrice, size: 2})}</div>
        <div>{numberFormatter({value, size: 2})}</div>
      </div>
    </div>
  )
}

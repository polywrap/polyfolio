import React, { useEffect } from "react";

import classNames from "classnames";
import styles from './ChartBlock.module.scss';

import ApexCharts from 'apexcharts';
import useTheme from 'common/hooks/useTheme/useTheme';
import { options, singleConstants } from './mocks';

function ChartBlock() {
  const theme = useTheme()

  useEffect(() => {
    renderChart()
  }, [])

  const renderChart = () => {
    const chart = new ApexCharts(document.querySelector('#chart'), options)
    chart.render()
  }

  return (
    <div className={classNames(styles[theme], styles.block)}>
      <div className={styles.title_block}>
        <div className={styles.price}>{singleConstants.mainPrice}</div>
        <div className={styles.subtitle_block}>
          <div className={styles.dynamics}>
            <span className={styles.val}>{singleConstants.percentProfit}</span>
            <span className={styles.profit}>{singleConstants.currencyProfit}</span>
          </div>
          <div>1D</div>
        </div>
      </div>
      <div id='chart' />
    </div>
  )
}

export default ChartBlock

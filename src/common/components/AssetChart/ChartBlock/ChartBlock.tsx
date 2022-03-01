import React, { useEffect } from "react";

import classNames from "classnames";
import styles from './ChartBlock.module.scss';

import ApexCharts from 'apexcharts';
import useTheme from 'common/hooks/useTheme/useTheme';
import { dates, prices } from './mocks';

const options = {
  series: [{
    name: "STOCK ABC",
    data: prices
  }],
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },

  labels: dates,
  xaxis: {
    type: 'datetime',
    lines: {
      show: false
    }
  },
  yaxis: {
    lines: {
      show: false,
    }
  },
  legend: {
    horizontalAlign: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.1,
      gradientToColors: ['rgb(109, 231, 182)', 'rgb(109, 231, 182)'], // optional, if not defined - uses the shades of same color in series
      inverseColors: false,
      opacityFrom: 0,
      opacityTo: 0.5,
      stops: [0, 100],
      colorStops: []
    }
  }
}

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
      <div className={styles.titleBlock}>
        <div className={styles.price}>$0.0937</div>
        <div className={styles.subtitleBlock}>
          <div className={styles.dynamics}>
            <span className={styles.val}>+0.02%</span>
            <span className={styles.profit}>+$0.56</span>
          </div>
          <div>1D</div>
        </div>
      </div>
      <div id='chart' />
    </div>
  )
}

export default ChartBlock

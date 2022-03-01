import React from 'react';

import styles from './AssetChart.module.scss';
import classNames from 'classnames';

import useTheme from 'common/hooks/useTheme/useTheme';
import { NavLink } from 'react-router-dom';
import ChartBlock from './ChartBlock/ChartBlock';
import Icon from '../Icon/Icon';
import arrow from '../../../assets/icons/images/back-arrow.svg';

function AssetChart() {
  const theme = useTheme()

  return (
    <div className={classNames(styles[theme], styles.chart)}>
      <div className={styles.wrapper}>
        <div>
          <NavLink className={styles.link} to='/dashboard'>
            <Icon src={arrow} className={styles.arrow} />
            Back To Dashboard
          </NavLink>
        </div>
        <div className={styles.title}>
          Graph Token <span className={styles.ticker}>GRT</span>
        </div>
        <ChartBlock />
      </div>
    </div>
  )
}

export default AssetChart

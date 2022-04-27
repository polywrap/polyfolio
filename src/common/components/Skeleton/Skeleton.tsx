import React from 'react';
import classNames from 'classnames';
import styles from './Skeleton.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';

function Skeleton({width, height}: {width: number; height: number}) {
  const theme = useTheme();

  return <div className={classNames(styles[theme], styles.skeleton)} style={{width, height}} />;
}

export default Skeleton;

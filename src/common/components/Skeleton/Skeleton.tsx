import React from 'react';
import classNames from 'classnames';
import styles from './Skeleton.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';

function Skeleton({
  width,
  height,
  style,
}: {
  width: number | string;
  height: number | string;
  style?: React.CSSProperties;
}) {
  const theme = useTheme();

  return (
    <div
      className={classNames(styles[theme], styles.skeleton)}
      style={{width: `${width}${width === 100 ? '%' : 'px'}`, height, ...style}}
    />
  );
}

export default Skeleton;

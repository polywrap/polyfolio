import React from 'react';
import classNames from 'classnames';
import styles from './Dots.module.scss';

const getContainerStyle = (width: number) => {
  return {
    width: width,
    height: width / 3 - 10 + 'px',
  };
};

const getBallStyle = (width: number) => {
  return {
    width: width / 3 - 10 + 'px',
    height: width / 3 - 10 + 'px',
  };
};

function Dots({
  width = 120,
  style,
}: {
  width?: number | string;
  style?: React.CSSProperties;
}) {
  const widthParsed = parseInt(width.toString());

  return (
    <div className={styles['ball-loader']} style={{...getContainerStyle(widthParsed), ...style}}>
      <div
        className={classNames(styles['ball-loader-ball'], styles.ball1)}
        style={getBallStyle(widthParsed)}
      />
      <div
        className={classNames(styles['ball-loader-ball'], styles.ball2)}
        style={getBallStyle(widthParsed)}
      />
      <div
        className={classNames(styles['ball-loader-ball'], styles.ball3)}
        style={getBallStyle(widthParsed)}
      />
    </div>
  );
}

export default Dots;

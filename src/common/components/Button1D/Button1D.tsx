import React from 'react';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import styles from './Button1D.module.scss';
import classNames from 'classnames';

function Button1D({fontSize, className}) {
  return (
    <button style={{fontSize}} className={classNames(styles.btn, className)}>
      1D <MenuArrow className={styles.arrow} filled startPosition={'up'} />
    </button>
  );
}

export default Button1D;

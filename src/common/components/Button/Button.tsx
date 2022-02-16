import React, {DispatchWithoutAction} from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({
  title,
  size = 'medium',
  className = '',
  buttonType = 'primary',
  onClick,
}: {
  title: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  buttonType?: 'primary' | 'primary_outline';
  onClick?: DispatchWithoutAction;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.common_button, styles[size], styles[buttonType], className)}
    >
      {title}
    </button>
  );
}

export default Button;

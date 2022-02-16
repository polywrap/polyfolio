import React, {Dispatch, DispatchWithoutAction} from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';
import MaskIcon from '../MaskIcon/MaskIcon';
import useTheme from 'common/hooks/useTheme/useTheme';

function Input({
  type,
  value,
  icon = '',
  placeholder,
  inputClassName = '',
  wrapperClassName = '',
  onClick,
  onChange,
}: {
  value?: string;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  icon?: string;
  type?: 'text' | 'number';
  onChange?: Dispatch<string>;
  onClick?: DispatchWithoutAction;
}) {
  const theme = useTheme();

  return (
    <div className={classNames(styles.common_input, styles[theme], wrapperClassName)}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames(styles.input, inputClassName)}
        onChange={(event) => onChange(event.target.value ?? '')}
      />
      {!!icon && (
        <div className={styles.icon_wrapper} onClick={onClick}>
          <MaskIcon src={icon} size={'12px'} />
        </div>
      )}
    </div>
  );
}

export default Input;

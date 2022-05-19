import React, {Dispatch, DispatchWithoutAction} from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';

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
    <form
      className={classNames(styles.common_input, styles[theme], wrapperClassName)}
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames(styles.input, inputClassName)}
        onChange={(event) => onChange(event.target.value ?? '')}
      />
      {!!icon && (
        <button type='submit' className={styles.icon_wrapper} onClick={onClick}>
          <MaskIcon src={icon} size={'12px'} />
        </button>
      )}
    </form>
  );
}

export default Input;

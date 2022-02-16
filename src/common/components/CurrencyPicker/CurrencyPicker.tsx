import React, {useState, useRef} from 'react';
import classNames from 'classnames';

import styles from './CurrencyPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {useCurrency} from 'common/currency/Currency.context';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';

function CurrencyPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {currency} = useCurrency();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => setIsOpen(false));

  return (
    <div
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className={classNames(styles.common_currency_picker, styles[theme], className)}
    >
      <span className={styles.currency}>{currency}</span>
      <MenuArrow startPosition={!isOpen ? 'down' : 'up'} />
    </div>
  );
}

export default CurrencyPicker;

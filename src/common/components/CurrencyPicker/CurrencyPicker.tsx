import React, {useState, useRef, useCallback} from 'react';
import classNames from 'classnames';

import styles from './CurrencyPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {useCurrency} from 'common/currency/Currency.context';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import CurrencyPickerInfo from 'common/components/CurrencyPicerInfo/CurrencyPicker';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';

function CurrencyPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {currency, setCurrency} = useCurrency();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const translation = useTranslation();

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleMenuItemClicked = useCallback(
    (item) => {
      setIsOpen(false);
      setCurrency(translation.Currency[item.title]);
    },
    [setCurrency, translation.Currency],
  );

  return (
    <div ref={ref} className={classNames(styles.common_header_gas_info, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={<CurrencyPickerInfo onClick={handleMenuItemClicked} />}
      >
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.common_currency_picker, styles[theme], className)}
        >
          <span className={styles.currency}>{currency}</span>
          <MenuArrow startPosition={!isOpen ? 'down' : 'up'} />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default CurrencyPicker;

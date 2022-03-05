import React, {useState, useRef, useCallback, useMemo} from 'react';
import classNames from 'classnames';

import styles from './LocalizationPicker.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import LocalizationPickerInfo from '../LocalizationPickerInfo/LocalizationPickerInfo';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import {useLanguageContext} from 'common/localization/Localization.context';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';

function LocalizationPicker({className = ''}: {className?: string}) {
  const ref = useRef(null);
  const theme = useTheme();
  const {language, setLanguage} = useLanguageContext()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const translation = useTranslation();

  useOnClickOutside(ref.current, () => setIsOpen(false));

  const handleMenuItemClicked = useCallback(
    (item) => {
      setIsOpen(false);
      setLanguage(translation.Language[item.title]);
    },
    [setLanguage, translation.Language],
  );

  const getLanguage = useMemo(() => {
    switch (language) {
      case 'en': return 'English'
      default: return 'English'
    }
  }, [language])

  return (
    <div ref={ref} className={classNames(styles.common_header_gas_info, className)}>
      <TooltipTrigger
        isOpen={isOpen}
        placement={'bottom-end'}
        popper={<LocalizationPickerInfo onClick={handleMenuItemClicked} />}
      >
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(styles.common_currency_picker, styles[theme], className)}
        >
          <span className={styles.currency}>{getLanguage}</span>
          <MenuArrow startPosition={!isOpen ? 'down' : 'up'} />
        </div>
      </TooltipTrigger>
    </div>
  );
}

export default LocalizationPicker;

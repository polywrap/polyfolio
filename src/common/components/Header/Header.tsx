import React, {useState} from 'react';
import classnames from 'classnames';

import styles from './Header.module.scss';

import Input from '../Input/Input';
import Gas from 'common/components/Gas/Gas';
import iconsObj from 'assets/icons/iconsObj';
import Logo from 'common/components/Logo/Logo';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderInfo from 'common/components/HeaderInfo/HeaderInfo';
import ThemeSwitcher from 'common/components/ThemeSwitcher/ThemeSwitcher';
import CurrencyPicker from 'common/components/CurrencyPicker/CurrencyPicker';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function Header({
  className = '',
  inputClassName = '',
}: {
  className?: string;
  inputClassName?: string;
}) {
  const theme = useTheme();
  const translation = useTranslation();
  const [value, setValue] = useState<string>();

  return (
    <div className={styles.wrapper}>
      <header className={classnames(styles.common_header, styles[theme])}>
        <div className={classnames(styles.content, className)}>
          <div className={styles.container}>
            <Logo />
            <Input
              value={value}
              onChange={setValue}
              icon={iconsObj.search}
              wrapperClassName={classnames(styles.input, inputClassName)}
              placeholder={translation.Common.searchPlaceholder}
            />
          </div>

          <div className={styles.container}>
            <Gas />
            <CurrencyPicker className={styles.header_item} />
            <ThemeSwitcher className={styles.header_item} />
            <HeaderInfo className={styles.header_item} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

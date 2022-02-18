import React, {useState, useRef} from 'react';
import classNames from 'classnames';

import styles from './Header.module.scss';

import Gas from 'common/components/Gas/Gas';
import iconsObj from 'assets/icons/iconsObj';
import Logo from 'common/components/Logo/Logo';
import Icon from 'common/components/Icon/Icon';
import Input from 'common/components/Input/Input';
import useAuth from 'common/hooks/useAuth/useAuth';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import HeaderInfo from 'common/components/HeaderInfo/HeaderInfo';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import ThemeSwitcher from 'common/components/ThemeSwitcher/ThemeSwitcher';
import CurrencyPicker from 'common/components/CurrencyPicker/CurrencyPicker';
import useResizeObserver from 'common/hooks/useResizeObserver/useResizeObserver';

function Header({
  className = '',
  inputClassName = '',
}: {
  className?: string;
  inputClassName?: string;
}) {
  const theme = useTheme();
  const {user} = useAuth();
  const translation = useTranslation();
  const [value, setValue] = useState<string>();
  const menuRef = useRef<HTMLDivElement>(null);
  const {width} = useResizeObserver(menuRef);

  return (
    <div className={styles.wrapper}>
      <header className={classNames(styles.common_header, styles[theme])}>
        <div className={classNames(styles.content, className)}>
          <div className={styles.hamburger_menu} ref={menuRef} onClick={() => {}}>
            {user && <Icon src={iconsObj.profile} className={styles.profile_icon} />}
            <MaskIcon size={'18px'} src={iconsObj.mobileMenu} className={styles.mask_icon} />
          </div>

          <div className={styles.container}>
            <Logo />
            <Input
              value={value}
              onChange={setValue}
              icon={iconsObj.search}
              wrapperClassName={classNames(styles.input, inputClassName)}
              placeholder={translation.Common.searchPlaceholder}
            />
          </div>

          <div className={styles.menu}>
            <Gas />
            <CurrencyPicker className={styles.header_item} />
            <ThemeSwitcher className={styles.header_item} />
            <HeaderInfo className={styles.header_item} />
          </div>

          <div className={styles.mobile_search} style={{width: width}}>
            <MaskIcon
              onClick={() => {}}
              size={'18px'}
              src={iconsObj.search}
              className={styles.mask_icon}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

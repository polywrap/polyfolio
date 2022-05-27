import React, {useState, useRef, useCallback} from 'react';
import classNames from 'classnames';

import styles from './Header.module.scss';

import Gas from 'common/components/Gas/Gas';
import iconsObj from 'assets/icons/iconsObj';
import Logo from 'common/components/Logo/Logo';
import Icon from 'common/components/Icon/Icon';
import Input from 'common/components/Input/Input';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import HeaderInfo from 'common/components/HeaderInfo/HeaderInfo';
import MobileMenu from 'common/components/MobileMenu/MobileMenu';
import MobileSearch from 'common/components/MobileSearch/MobileSearch';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import ThemeSwitcher from 'common/components/ThemeSwitcher/ThemeSwitcher';
import CurrencyPicker from 'common/components/CurrencyPicker/CurrencyPicker';
import useResizeObserver from 'common/hooks/useResizeObserver/useResizeObserver';
import RoutePath from 'common/modules/routing/routing.enums';
import {useNavigate} from 'react-router-dom';
import useSearch from 'common/hooks/useSearch/useSearch';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {useRecoilValue} from 'recoil';

function Header({
  className = '',
  inputClassName = '',
}: {
  className?: string;
  inputClassName?: string;
}) {
  const theme = useTheme();
  const user = useRecoilValue(userPersistState);
  const {setSearch} = useSearch();
  const navigate = useNavigate();
  const translation = useTranslation();
  const [value, setValue] = useState<string>('');
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const {width} = useResizeObserver(menuRef);

  const handleChange = useCallback(
    (val: string) => {
      setValue(val);
    },
    [setValue],
  );

  const handleClick = useCallback(() => {
    setSearch(value);
    navigate(replaceRouteParameters(RoutePath.Dashboard, {user: value}));
  }, [navigate, setSearch, value]);

  return (
    <div className={styles.wrapper}>
      <header data-testid="header" className={classNames(styles.common_header, styles[theme])}>
        <div className={classNames(styles.content, className)}>
          <div
            className={styles.hamburger_menu}
            ref={menuRef}
            onClick={() => setIsOpenMobileMenu(true)}
          >
            {user && <Icon src={iconsObj.profile} className={styles.profile_icon} />}
            <MaskIcon size={'18px'} src={iconsObj.mobileMenu} className={styles.mask_icon} />
          </div>

          <div className={styles.container}>
            <Logo />
            <Input
              value={value}
              onChange={handleChange}
              onClick={handleClick}
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
            <div ref={searchRef} style={{pointerEvents: isOpenMobileSearch ? 'none' : 'auto'}}>
              <MaskIcon
                onClick={() => setIsOpenMobileSearch(!isOpenMobileSearch)}
                size={'18px'}
                src={iconsObj.search}
                className={styles.mask_icon}
              />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isOpenMobileMenu} onClose={() => setIsOpenMobileMenu(false)} />
      <MobileSearch isOpen={isOpenMobileSearch} onClose={() => setIsOpenMobileSearch(false)} />
    </div>
  );
}

export default Header;

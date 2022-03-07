import React from 'react';

import useTheme from 'common/hooks/useTheme/useTheme';
import classNames from 'classnames';
import style from './SettingsBody.module.scss';

import useTranslation from 'common/hooks/useTranslation/useTranslation';
import ProfileWallet from 'common/components/ProfileWallet/ProfileWallet';
import useAuth from 'common/hooks/useAuth/useAuth';
import Icon from 'common/components/Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';
import ThemeSwitcher from 'common/components/ThemeSwitcher/ThemeSwitcher';
import CurrencyPicker from 'common/components/CurrencyPicker/CurrencyPicker';
import LocalizationPicker from 'common/components/LocalizationPicker/LocalizationPicker';

function SettingsBody() {
  const theme = useTheme()
  const { user } = useAuth()
  const translation = useTranslation()

  return (
    <div className={classNames(style[theme])}>
      <div className={style.head_title}>{translation.SidebarMenu.settings}</div>
      <div>
        <div className={style.profile_sign}>{translation.Settings.profile}</div>
        <div className={style.profile}>
          <Icon src={iconsObj.profile} className={style.profile_icon} />
          <div className={style.address_container}>
            <div className={style.main_addr}>
              <ProfileWallet address={user} size={6} />
            </div>
            <ProfileWallet address={user} size={6} />
          </div>
        </div>
      </div>
      <div className={style.settings_prop}>
        <div className={style.row}>
          <div className={style.left}>{translation.Settings.theme}</div>
          <div className={style.right}><ThemeSwitcher /></div>
        </div>
        <div className={style.row}>
          <div className={style.left}>{translation.Settings.baseCurrency}</div>
          <div className={style.right}><CurrencyPicker /></div>
        </div>
        <div className={style.row}>
          <div className={style.left}>{translation.Settings.language}</div>
          <div className={style.right}><LocalizationPicker /></div>
        </div>
      </div>
    </div>
  )
}

export default SettingsBody

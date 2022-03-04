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

function SettingsBody() {
  const theme = useTheme()
  const { user } = useAuth()
  const translation = useTranslation()

  return (
    <div className={classNames(style[theme])}>
      <div className={style.wrapper}>
        <div className={style.head_title}>Settings</div>
        <div>
          <div className={style.profile}>Profile</div>
          <div>
            <Icon src={iconsObj.profile} />
            <ProfileWallet address={user} size={3} />
          </div>
        </div>
        <div className={style.settings_prop}>
          <div className={style.row}>
            <div className={style.left}>Theme</div>
            <div className={style.right}><ThemeSwitcher /></div>
          </div>
          <div className={style.row}>
            <div className={style.left}>Base Currency</div>
            <div className={style.right}><CurrencyPicker /></div>
          </div>
          <div className={style.row}>
            <div className={style.left}>Language</div>
            <div className={style.right}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsBody

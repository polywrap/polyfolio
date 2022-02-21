import React, {DispatchWithoutAction} from 'react';
import classNames from 'classnames';

import styles from './ProfileDropdownMenu.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function ProfileDropdownMenu({onClick}: {onClick: DispatchWithoutAction}) {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles.common_profile_dropdown_menu, styles[theme])}>
      <div className={styles.menu_item} onClick={onClick}>
        <MaskIcon size={'21px'} src={iconsObj.disconnect} className={styles.icon} />
        <div className={styles.title}>{translation.ProfileDropdownMenu.disconnectWallet}</div>
      </div>
    </div>
  );
}

export default ProfileDropdownMenu;

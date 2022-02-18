import React from 'react';
import _slice from 'lodash/slice';
import classNames from 'classnames';

import styles from './ProfileWallet.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';

function ProfileWallet({address, size}: {address: string; size: number}) {
  const theme = useTheme();

  return (
    <div className={classNames(styles.common_profile_wallet, styles[theme])}>
      <span>{_slice(address, 0, size)}</span>
      {'...'}
      <span>{_slice(address, -size)}</span>
    </div>
  );
}

export default ProfileWallet;

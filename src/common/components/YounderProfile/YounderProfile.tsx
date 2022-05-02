import React, {useMemo} from 'react';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import Icon from '../Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';

import styles from './YounderProfile.module.scss';
import ProfileWallet from '../ProfileWallet/ProfileWallet';

const YounderProfile = (
    {ens, address, style}
    : {ens: string, address: string, style?: string}
  ) => {
  const theme = useTheme();

  const name = useMemo(() => {
    if (ens.substring(0, 2) === '0x') {
      return <ProfileWallet address={ens} size={6} />
    } else {
      return ens;
    }
  }, [ens])

  return (
    <div className={classNames(styles[theme], styles.YounderProfile, style)}>
      <Icon src={iconsObj.profile} className={styles.icon} />
      <div className={styles.addressContainer}>
        <div className={styles.ens}>{name}</div>
        <div className={styles.address}>
          <ProfileWallet address={address} size={6} />
          <a
            href={`https://rinkeby.etherscan.io/address/${address}`}
            target='_blank'
            className={styles.address}
            rel="noreferrer"
          >
            <Icon 
              src={iconsObj.addressStatusIcon}
              className={styles.icon_min}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default YounderProfile;

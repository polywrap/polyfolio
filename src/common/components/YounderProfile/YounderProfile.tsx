import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import Icon from '../Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';
import {linkToAccountOnEtherscan, startOfEthereumAddress} from 'utils/constants';
import navigateToExternalLink from 'utils/navigateToExternalLink';

import styles from './YounderProfile.module.scss';
import ProfileWallet from '../ProfileWallet/ProfileWallet';

const YounderProfile = ({ens, address, style}: {ens: string; address: string; style?: string}) => {
  const theme = useTheme();
  const link = linkToAccountOnEtherscan + address;
  const isExternal = true;

  const name = useMemo(() => {
    if (ens.substring(0, 2) === startOfEthereumAddress) {
      return <ProfileWallet address={ens} size={6} />;
    } else {
      return ens;
    }
  }, [ens]);

  return (
    <div className={classNames(styles[theme], styles.YounderProfile, style)}>
      <Icon src={iconsObj.profile} className={styles.icon} />
      <div className={styles.addressContainer}>
        <div className={styles.ens}>{name}</div>
        <div className={styles.address}>
          <ProfileWallet address={address} size={6} />
          <Link
            to={link}
            onClick={(event) => navigateToExternalLink({event, link, isExternal})}
            className={styles.address}
          >
            <Icon src={iconsObj.addressStatusIcon} className={styles.icon_min} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YounderProfile;

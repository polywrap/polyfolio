import React, {useState, useRef} from 'react';
import classNames from 'classnames';

import styles from './Profile.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import useAuth from 'common/hooks/useAuth/useAuth';
import numberFormatter from 'utils/numberFormatter';
import useTheme from 'common/hooks/useTheme/useTheme';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import ProfileWallet from 'common/components/ProfileWallet/ProfileWallet';
import TooltipTrigger from 'common/components/TooltipTrigger/TooltipTrigger';
import useOnClickOutside from 'common/hooks/useOnClickOutside/useOnClickOutside';
import ProfileDropdownMenu from 'common/components/ProfileDropdownMenu/ProfileDropdownMenu';
import Button from '../Button/Button';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useWallet from 'common/hooks/useWallet/useWallet';
import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import Dots from '../Loaders/Dots';

function Profile() {
  const theme = useTheme();
  const ref = useRef(null);
  const translation = useTranslation();
  const {user, logOut} = useAuth();
  const {connect} = useWallet();
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => isOpen && setIsOpen(false));

  return (
    <div className={classNames(styles.common_profile, styles[theme])}>
      {user ? (
        <>
          <Icon src={iconsObj.profile} className={styles.profile_icon} />
          <div className={styles.profile_info}>
            <div className={styles.wallet}>
              <ProfileWallet address={user} size={4} />
              <div ref={ref}>
                <TooltipTrigger
                  isOpen={isOpen}
                  placement={'bottom'}
                  popper={<ProfileDropdownMenu onClick={logOut} />}
                >
                  <div className={styles.content} onClick={() => setIsOpen(!isOpen)}>
                    <MenuArrow filled startPosition={!isOpen ? 'right' : 'down'} />
                  </div>
                </TooltipTrigger>
              </div>
            </div>
            {preparedData['allAssetsSum'] ? (
              <div className={styles.amount}>${numberFormatter(preparedData['allAssetsSum'])}</div>
            ) : (
              <Dots />
            )}
          </div>
        </>
      ) : (
        <div className={styles.public_profile}>
          <div className={styles.title}>{translation.Profile.title}</div>
          <Button title={translation.Profile.button} onClick={() => connect()} size={'small'} />
        </div>
      )}
    </div>
  );
}

export default Profile;

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

const MOCK_VALUE = 13337337;

function Profile() {
  const theme = useTheme();
  const ref = useRef(null);
  const {user, logOut} = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref.current, () => isOpen && setIsOpen(false));

  return (
    <div className={classNames(styles.common_profile, styles[theme])}>
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
                <MenuArrow filled startPosition={!isOpen ? 'right' : 'left'} />
              </div>
            </TooltipTrigger>
          </div>
        </div>
        <div className={styles.amount}>${numberFormatter({value: MOCK_VALUE, size: 2})}</div>
      </div>
    </div>
  );
}

export default Profile;

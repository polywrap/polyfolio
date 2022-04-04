import React, {useState} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './SidebarLinks.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {SidebarLink} from './SidebarLinks.types';
import {sidebarLinks, networkDropdown} from './SidebarLinks.config';
import navigateToExternalLink from 'utils/navigateToExternalLink';
import MaskIcon from '../MaskIcon/MaskIcon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import NetworkDropdown from '../NetworkDropdown/NetworkDropdown';

function SidebarLinks() {
  const theme = useTheme();
  const translation = useTranslation();
  const [network, setNetwork] = useState<Record<string, unknown>>(networkDropdown[0])
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={classNames(styles.common_sidebar_links, styles[theme])}>
      <div className={styles.dropdownContainer}>
        <NetworkDropdown
         array={networkDropdown}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         className={styles.dropdownIcon}
         current={network}
         onClick={setNetwork}
        />
      </div>
      {_map(sidebarLinks, ({link, icon, isExternal, title}: SidebarLink) => {
        return (
          <Link
            key={icon}
            onClick={(event) => navigateToExternalLink({event, link, isExternal})}
            className={styles.link}
            to={link}
          >
            <MaskIcon size={'18px'} src={icon} className={styles.icon} />
            {translation.SidebarLinks[title]}
          </Link>
        );
      })}
    </div>
  );
}

export default SidebarLinks;

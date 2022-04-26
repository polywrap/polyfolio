import React, {useCallback, useEffect, useState} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './SidebarLinks.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {SidebarLink, INetworksList} from './SidebarLinks.types';
import {sidebarLinks, networkDropdown} from './SidebarLinks.config';
import navigateToExternalLink from 'utils/navigateToExternalLink';
import MaskIcon from '../MaskIcon/MaskIcon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import NetworkDropdown from '../NetworkDropdown/NetworkDropdown';
import useSearch from 'common/hooks/useSearch/useSearch';

function SidebarLinks() {
  const theme = useTheme();
  const translation = useTranslation();
  const [networkList, setNetworkList] = useState<INetworksList[]>(networkDropdown)
  const [network, setNetwork] = useState<INetworksList>(networkDropdown[0])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {search, setSearch} = useSearch();

  const handleClick = useCallback((event, link, isExternal) => {
    if (search) {
      setSearch(null);
    }
    navigateToExternalLink({event, link, isExternal});
  }, [search, setSearch])

  const handleNetworkChange = useCallback((name) => {
    setNetworkList(networkList.map(network =>
      network.name === name
        ? {...network, checked: !network.checked}
        : network
    ))
  }, [networkList])

  useEffect(() => {
    let checked = false;
    networkList.forEach((network) => {
      if (network.checked) {
        checked = true;
        setNetwork(network);
      }
    })

    if (!checked) setNetwork(networkList[0]);
  }, [networkList])

  return (
    <div className={classNames(styles.common_sidebar_links, styles[theme])}>
      <div className={styles.dropdownContainer}>
        <NetworkDropdown
         array={networkList}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         className={styles.dropdownIcon}
         current={network}
         onChange={handleNetworkChange}
        />
      </div>
      {_map(sidebarLinks, ({link, icon, isExternal, title}: SidebarLink) => {
        return (
          <Link
            key={icon}
            onClick={(event) => handleClick(event, link, isExternal)}
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

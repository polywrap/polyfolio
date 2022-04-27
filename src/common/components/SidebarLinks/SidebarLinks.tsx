import React, {useCallback} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './SidebarLinks.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {SidebarLink} from './SidebarLinks.types';
import {sidebarLinks} from './SidebarLinks.config';
import navigateToExternalLink from 'utils/navigateToExternalLink';
import MaskIcon from '../MaskIcon/MaskIcon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useSearch from 'common/hooks/useSearch/useSearch';
import NetworksPicker from '../NetworksPicker/NetworksPicker';

function SidebarLinks() {
  const theme = useTheme();
  const translation = useTranslation();
  const {search, setSearch} = useSearch();

  const handleClick = useCallback((event, link, isExternal) => {
    if (search) {
      setSearch(null);
    }
    navigateToExternalLink({event, link, isExternal});
  }, [search, setSearch])

  return (
    <div className={classNames(styles.common_sidebar_links, styles[theme])}>
      <div className={styles.dropdownContainer}>
        <NetworksPicker />
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

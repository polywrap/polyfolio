import React from 'react';
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

function SidebarLinks() {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles.common_sidebar_links, styles[theme])}>
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

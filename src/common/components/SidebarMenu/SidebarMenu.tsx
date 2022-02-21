import React from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

import styles from './SidebarMenu.module.scss';

import {SidebarMenuItem} from './SidebarMenu.types';
import useTheme from 'common/hooks/useTheme/useTheme';
import {sidebarMenuItems} from './SidebarMenu.config';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import navigateToExternalLink from 'utils/navigateToExternalLink';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function SidebarMenu() {
  const theme = useTheme();
  const translation = useTranslation();

  const CustomLink = ({link, icon, isExternal, title}: SidebarMenuItem) => {
    const resolved = useResolvedPath(link);
    const isActive = useMatch({path: resolved.pathname, end: true});

    console.log({resolved});
    console.log({isActive});

    return (
      <Link
        key={icon}
        onClick={(event) => navigateToExternalLink({event, link, isExternal})}
        className={classNames(styles.link, {[styles.link_active]: !!isActive})}
        to={link}
      >
        <MaskIcon size={'18px'} src={icon} className={styles.icon} />
        {translation.SidebarMenu[title]}
      </Link>
    );
  };

  return (
    <div className={classNames(styles.common_sidebar_menu, styles[theme])}>
      {_map(sidebarMenuItems, (link: SidebarMenuItem) => (
        <CustomLink {...link} />
      ))}
    </div>
  );
}

export default SidebarMenu;

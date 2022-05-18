import React, { useCallback } from 'react';
import _map from 'lodash/map';
import _reject from 'lodash/reject';
import classNames from 'classnames';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

import styles from './SidebarMenu.module.scss';

import {SidebarMenuItem} from './SidebarMenu.types';
import useTheme from 'common/hooks/useTheme/useTheme';
import {sidebarMenuItems} from './SidebarMenu.config';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import navigateToExternalLink from 'utils/navigateToExternalLink';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import RoutePath from 'common/modules/routing/routing.enums';
import useSearch from 'common/hooks/useSearch/useSearch';
import { userPersistState } from 'common/modules/atoms/userAddress';
import { useRecoilValue } from 'recoil';

function SidebarMenu() {
  const theme = useTheme();
  const user = useRecoilValue(userPersistState);
  const translation = useTranslation();
  const {search, setSearch} = useSearch();

  const handleClick = useCallback((event, link, isExternal) => {
    if (search) {
      setSearch(null);
    }
    navigateToExternalLink({event, link, isExternal});
  }, [search, setSearch])

  const CustomLink = ({link, icon, isExternal, title}: SidebarMenuItem) => {
    const resolved = useResolvedPath(link);
    const isActive = useMatch({path: resolved.pathname, end: true});

    return (
      <Link
        key={icon}
        onClick={(event) => handleClick(event, link, isExternal)}
        className={classNames(styles.link, {[styles.link_active]: !!isActive})}
        to={link.replace(':user', user)}
      >
        <MaskIcon size={'18px'} src={icon} className={styles.icon} />
        {translation.SidebarMenu[title]}
      </Link>
    );
  };

  return (
    <div className={classNames(styles.common_sidebar_menu, styles[theme])}>
      {_map(
        user
          ? sidebarMenuItems
          : _reject(sidebarMenuItems, (link) => link.link === RoutePath.Dashboard),
        (link: SidebarMenuItem) => (
          <CustomLink {...link} key={link.icon} />
        ),
      )}
    </div>
  );
}

export default SidebarMenu;

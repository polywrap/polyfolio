import React from 'react';
import classNames from 'classnames';

import styles from './Sidebar.module.scss';

import Profile from '../Profile/Profile';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import SocialLinks from '../SocialLinks/SocialLinks';
import SidebarLinks from '../SidebarLinks/SidebarLinks';

function Sidebar({className = ''}: {className?: string}) {
  return (
    <div className={classNames(styles.common_sidebar, className)}>
      <div className={styles.section}>
        <Profile />
        <SidebarMenu />
      </div>
      <div className={styles.section}>
        <SidebarLinks />
        <SocialLinks />
      </div>
    </div>
  );
}

export default Sidebar;

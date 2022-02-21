import React from 'react';

import styles from './Sidebar.module.scss';

import Profile from '../Profile/Profile';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import SocialLinks from '../SocialLinks/SocialLinks';
import SidebarLinks from '../SidebarLinks/SidebarLinks';

function Sidebar() {
  return (
    <div className={styles.common_sidebar}>
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

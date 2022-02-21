import iconsObj from 'assets/icons/iconsObj';
import {SidebarMenuItem} from './SidebarMenu.types';
import RoutePath from 'common/modules/routing/routing.enums';

const sidebarMenuItems: SidebarMenuItem[] = [
  {
    title: 'dashboard',
    link: RoutePath.Dashboard,
    icon: iconsObj.home,
  },
  {
    title: 'settings',
    link: RoutePath.Settings,
    icon: iconsObj.settings,
  },
];

export {sidebarMenuItems};

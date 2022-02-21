import iconsObj from 'assets/icons/iconsObj';
import {SidebarLink} from './SidebarLinks.types';
import RoutePath from 'common/modules/routing/routing.enums';

const sidebarLinks: SidebarLink[] = [
  {
    title: 'polywrap',
    link: RoutePath.Polywrap,
    icon: iconsObj.polywrap,
  },
  {
    title: 'docs',
    link: RoutePath.Docs,
    icon: iconsObj.docs,
  },
  {
    title: 'support',
    link: RoutePath.Support,
    icon: iconsObj.help,
  },
];

export {sidebarLinks};

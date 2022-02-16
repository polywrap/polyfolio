import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {HeaderInfoMenuItem} from './HeaderInfoMenu.interface';

const menuItems: HeaderInfoMenuItem[] = [
  {
    title: 'requestFeatures',
    link: RoutePath.RequestFeatures,
    icon: iconsObj.bulb,
  },
  {
    title: 'docs',
    link: RoutePath.Docs,
    icon: iconsObj.docs,
  },
  {
    title: 'settings',
    link: RoutePath.Settings,
    icon: iconsObj.settings,
  },
  {
    title: 'divider',
    isDivider: true,
  },
  {
    title: 'discord',
    link: RoutePath.Discord,
    icon: iconsObj.discord,
    isExternal: true,
  },
  {
    title: 'twitter',
    link: RoutePath.Twitter,
    icon: iconsObj.twitter,
    isExternal: true,
  },
];

export {menuItems};

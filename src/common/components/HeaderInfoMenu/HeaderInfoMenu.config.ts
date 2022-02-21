import iconsObj from 'assets/icons/iconsObj';
import {HeaderInfoMenuItem} from './HeaderInfoMenu.types';
import RoutePath from 'common/modules/routing/routing.enums';

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

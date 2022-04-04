import iconsObj from 'assets/icons/iconsObj';
import {SidebarLink, INetworksList} from './SidebarLinks.types';
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

const networkDropdown: INetworksList[] = [
  {
    id: 1,
    icon: iconsObj.ethereum,
    title: 'Ethereum',
    name: 'ethereum',
    checked: false,
  },
  {
    id: 2,
    icon: iconsObj.polygon,
    title: 'Polygon',
    name: 'polygon',
    checked: false,
  },
];

export {sidebarLinks, networkDropdown};

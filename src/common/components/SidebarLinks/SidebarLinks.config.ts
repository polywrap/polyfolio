import iconsObj from 'assets/icons/iconsObj';
import { SidebarLink, INetworksList } from './SidebarLinks.types';
import RoutePath from 'common/modules/routing/routing.enums';
import { networks } from 'utils/constants';

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

const networkDropdown: INetworksList[] = networks.map(item => {
  return {
    id: item.name,
    icon: iconsObj.ethereum,
    title: item.title,
    name: item.name,
    checked: true,
  }
});

export { sidebarLinks, networkDropdown };

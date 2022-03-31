import {ProtocolsItem} from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';

const menuItems: ProtocolsItem[] = [
  {
    icon: iconsObj.protocolBardger,
    link: `${RoutePath.Protocol}`,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    claimableValue: 183.92,
    valueTitle: 5323.39,
    valueIsMinus: false,
    title: 'badger',
    id: 1,
  },
  {
    secondaryTitleDollar: 163.63,
    link: `${RoutePath.Protocol}`,
    secondaryTitlePercent: 15.32,
    icon: iconsObj.protocolEth,
    claimableValue: 183.92,
    valueTitle: 5323.39,
    valueIsMinus: true,
    title: 'eth',
    id: 2,
  },
  {
    link: `${RoutePath.Protocol}`,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    icon: iconsObj.protocolUfo,
    claimableValue: 183.92,
    valueTitle: 5323.39,
    valueIsMinus: false,
    title: 'ufo',
    id: 3,
  },
  {
    link: `${RoutePath.Protocol}`,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    icon: iconsObj.protocolBtc,
    claimableValue: 183.92,
    valueTitle: 5323.39,
    valueIsMinus: false,
    title: 'btc',
    id: 4,
  },
  {
    link: `${RoutePath.Protocol}`,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    icon: iconsObj.protocolGel,
    claimableValue: 183.92,
    valueIsMinus: false,
    valueTitle: 5323.39,
    title: 'gel',
    id: 5,
  },
];

export {menuItems};

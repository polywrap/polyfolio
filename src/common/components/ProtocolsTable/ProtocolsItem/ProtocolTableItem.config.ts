import {ProtocolsItem} from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';

const menuItems: ProtocolsItem[] = [
  {
    title: 'badger',
    valueTitle: 5323.39,
    valueIsMinus: false,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    claimableValue: 183.92,
    icon: iconsObj.protocolBardger,
    id: 1,
  },
  {
    title: 'divider',
    isDivider: true,
  },
  {
    title: 'eth',
    valueTitle: 5323.39,
    valueIsMinus: true,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    claimableValue: 183.92,
    icon: iconsObj.protocolEth,
    id: 2,
  },
  {
    title: 'divider',
    isDivider: true,
  },
  {
    title: 'ufo',
    valueTitle: 5323.39,
    valueIsMinus: false,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    claimableValue: 183.92,
    icon: iconsObj.protocolUfo,
    id: 3,
  },
  {
    title: 'divider',
    isDivider: true,
  },
  {
    title: 'btc',
    valueTitle: 5323.39,
    valueIsMinus: false,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    claimableValue: 183.92,
    icon: iconsObj.protocolBtc,
    id: 4,
  },
  {
    title: 'divider',
    isDivider: true,
  },
  {
    title: 'gel',
    valueTitle: 5323.39,
    valueIsMinus: false,
    secondaryTitleDollar: 163.63,
    secondaryTitlePercent: 15.32,
    id: 5,
    claimableValue: 183.92,
    icon: iconsObj.protocolGel,
  },
];

export {menuItems};

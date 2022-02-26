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
    claimableValue: 183.92,
    icon: iconsObj.protocolGel,
  },
];

export {menuItems};

import {HeaderGasInfoItem} from './HeaderGasInfoMenu.types';

const menuItems: HeaderGasInfoItem[] = [
  {
    title: 'divider',
    isDivider: true,
  },

  {
    title: 'slow',
    time: '~ 3 min',
    titlePrice: 118,
    colorIcon: '#F56565',
    price: 33.78,
  },
  {
    title: 'medium',
    time: '~ 1 min',
    colorIcon: '#FACC16',
    titlePrice: 121,
    price: 34.78,
  },
  {
    title: 'fast',
    time: '~ 30 sec',
    colorIcon: '#27C69F',
    titlePrice: 124,
    price: 36.78,
  },
];

export {menuItems};

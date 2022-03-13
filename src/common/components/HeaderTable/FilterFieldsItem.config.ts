import {FilterFields} from './FilterFieldsItem.types';

const menuItems: FilterFields[] = [
  {
    isDivider: true,
  },
  {
    title: 'asset',
    isRequired: true,
    id: 1,
  },
  {
    isDivider: true,
  },
  {
    title: 'allocation',
    id: 2,
  },
  {
    isDivider: true,
  },
  {
    title: 'price',
    id: 3,
  },
  {
    isDivider: true,
  },
  {
    title: 'value',
    id: 4,
  },
  {
    isDivider: true,
  },
];

export {menuItems};

import {FilterFields} from './FilterFieldsVaults.types';

const menuFields: FilterFields[] = [
  {
    isDivider: true,
  },
  {
    title: 'protocols',
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
    title: 'value',
    id: 3,
  },
  {
    isDivider: true,
  },
  {
    title: 'claimable',
    id: 4,
  },
  {
    isDivider: true,
  },
];

export {menuFields};

import {FilterFields} from './FilterFieldsProtocols.types';

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
    title: 'value',
    id: 2,
  },
  {
    isDivider: true,
  },
  {
    title: 'claimable',
    id: 3,
  },
  {
    isDivider: true,
  },
];

export {menuFields};

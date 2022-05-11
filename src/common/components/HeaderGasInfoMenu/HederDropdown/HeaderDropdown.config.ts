import {DropdownItemConfig} from '../../Dropdown/Dropdown.types';
import iconsObj from 'assets/icons/iconsObj';

const dropdownItems: DropdownItemConfig[] = [
  {
    title: 'Ethereum',
    icon: iconsObj.ethereum,
    id: 1,
  },
  {
    title: 'USD',
    icon: iconsObj.usd,
    id: 2,
  },
];

export {dropdownItems};

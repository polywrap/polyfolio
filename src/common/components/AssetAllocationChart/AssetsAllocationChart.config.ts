import {item} from './AssetAllocationChart.types';
import iconsObj from 'assets/icons/iconsObj';

const Item: item[] = [
  {
    title: 'usd',
    value: 49.79,
    icon: iconsObj.assetsUsdt,
    color: '#FACC16',
    id: 1,
  },
  {
    title: 'btc',
    value: 24.79,
    icon: iconsObj.assetsBitcoin,
    color: '#D88BE4',
    id: 2,
  },
  {
    title: 'ufo',
    value: 11.79,
    icon: iconsObj.assetsUfo,
    color: '#0D2535',
    id: 3,
  },
  {
    title: 'gel',
    value: 9.79,
    icon: iconsObj.assetsGel,
    color: ' #6DE7B6',
    id: 4,
  },
  {
    title: 'eth',
    value: 7.79,
    icon: iconsObj.assetsEth,
    color: '#FF9F40',
    id: 5,
  },
  {
    title: 'cqt',
    value: 6.79,
    icon: iconsObj.assetsCqt,
    color: '#FF8042',
    id: 6,
  },
];

export {Item};

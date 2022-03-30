import {VaultItem} from './VaultsTableItem.types';
import iconsObj from 'assets/icons/iconsObj';

const menuItems: VaultItem[] = [
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'usdtSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsUsdt,
    valueTitle: 8310072.32,
    valueIsMinus: false,
    priceTitle: 1,
    title: 'usdt',
    percent: 49,
    id: 1,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'btcSecondary',
    icon: iconsObj.assetsBitcoin,
    pricePercentDollar: 163.63,
    valueTitle: 1150066.5,
    priceTitle: 48939.13,
    valueIsMinus: false,
    title: 'btc',
    percent: 24,
    id: 2,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'ethSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsEth,
    valueTitle: 1150066.5,
    valueIsMinus: true,
    priceTitle: 4303.0,
    title: 'eth',
    percent: 23,
    id: 3,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'ufoSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsUfo,
    valueIsMinus: false,
    valueTitle: 1072.32,
    priceTitle: 28,
    title: 'ufo',
    percent: 1,
    id: 4,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'gelSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsGel,
    valueIsMinus: false,
    valueTitle: 1072.32,
    priceTitle: 29.53,
    title: 'gel',
    percent: 1,
    id: 5,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'cqtSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsCqt,
    valueTitle: 1072.32,
    valueIsMinus: true,
    priceTitle: 11.45,
    title: 'cqt',
    percent: 1,
    id: 6,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'ftmSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsFtm,
    valueTitle: 1072.32,
    valueIsMinus: false,
    priceTitle: 53.89,
    title: 'ftm',
    percent: 1,
    id: 7,
  },
  {
    secondaryPricePercentTitle: 15.32,
    secondaryTitle: 'maticSecondary',
    pricePercentDollar: 163.63,
    icon: iconsObj.assetsMatic,
    valueIsMinus: false,
    valueTitle: 1072.32,
    priceTitle: 73.89,
    title: 'matic',
    percent: 1,
    id: 8,
  },
];

export {menuItems};

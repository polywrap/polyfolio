import {IAssetBreakDown} from './AssetBreakDown.types';
import iconsObj from 'assets/icons/iconsObj';

export const mockData: IAssetBreakDown = {
  title: '3pool',
  assets: [
    {
      icon: iconsObj.assetsFtm,
      symbol: 'FTM',
      price: '1',
      value: '166.67',
    },
    {
      icon: iconsObj.assetsCqt,
      symbol: 'CQT',
      price: '1',
      value: '166.67',
    },
    {
      icon: iconsObj.assetsEth,
      symbol: 'ETH',
      price: '1',
      value: '166.68',
    },
  ],
};

import iconsObj from 'assets/icons/iconsObj';

export enum SupportedNetwork {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
}

export default [
  {
    name: SupportedNetwork.ETHEREUM,
    jsonRPC: 'http://infura.io/...',
    chainId: 1,
    title: 'Ethereum',
    checked: true,
    icon: iconsObj.ethereum,
  },
  {
    name: SupportedNetwork.POLYGON,
    jsonRPC: 'http://infura.io/...',
    chainId: 137,
    title: 'Polygon',
    checked: true,
    icon: iconsObj.polygon,
  },
];

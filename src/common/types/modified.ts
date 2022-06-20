import {NetworkBalance} from './entities';

export interface AssetData {
  //secondaryPricePercentTitle: string;
  valueSecondaryTitle: string;
  //pricePercentDollar: string;
  secondaryTitle: string;
  //valueIsMinus?: boolean;
  valueTitle: string;
  priceTitle: string;
  percent: string;
  title: string;
  tokenAddress: string;
  //iconInfoPage: string;
  //icon: string;
  link: string;
  symbol: string;
  protocol: string;
  network: string;
  chainId: number;
  id: string;
}

export interface Network {
  name: SupportedNetwork;
  jsonRPC: string;
  chainId: number;
  title: string;
}

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
}

export enum SupportedNetwork {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
}

export type ReducedBalance = Record<SupportedNetwork, NetworkBalance>;

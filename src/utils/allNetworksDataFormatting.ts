import _ from 'lodash';
import {
  ejectAssetsFromProtocol,
  ejectProtocolsFromNetwork,
  getAssetsValueSum,
} from './dataFormatting';

interface AccountBalance {
  account: string;
  chainId: string;
  values: Value[];
  protocols: ProtocolElement[];
}
export interface ProtocolElement {
  protocol: ProtocolProtocol;
  values: Value[];
  assets: Asset[];
}

export interface ProtocolElement {
  protocol: ProtocolProtocol;
  values: Value[];
  assets: Asset[];
}

export interface Asset {
  apr: null;
  apy: null | string;
  balance: Balance;
  isDebt: boolean;
  claimableTokens: TokenElement[];
}

export interface Balance {
  token: TokenElement;
  unresolvedComponents: number;
  components: Balance[];
}

export interface TokenElement {
  token: TokenToken;
  balance: string;
  values: Value[];
}

export interface TokenToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export interface Value {
  currency: Currency;
  price: string;
  value: string;
}

export enum Currency {
  Usd = 'usd',
}

export interface ProtocolProtocol {
  id: string;
  organization: string;
  name: string;
  version: string;
  adapterUri: string;
  forkedFrom: null;
  chainId: string;
}

const allNetworksDataFormatting = (balance: {[key: string]: AccountBalance}) => {
  if (balance) {
    const networks = Object.keys(balance);

    const allProtocols = networks.reduce(
      (allProtocols, network) => [...allProtocols, ...balance[network].protocols],
      [],
    );

    const allAssets = allProtocols
      .reduce((allAssets, protocol) => [...allAssets, ...ejectAssetsFromProtocol(protocol)], [])
      .flat();

    const allAssetsSum: number = getAssetsValueSum(allAssets);

    return {
      balance,
      allAssets,
      allProtocols,
      allAssetsSum,
    };
  }
};

export default allNetworksDataFormatting;

export interface ProtocolsItem {
  secondaryTitlePercent: string;
  secondaryTitleDollar: string;
  claimableValue: string;
  valueIsMinus?: boolean;
  valueTitle: string;
  title: string;
  icon?: string;
  link?: string;
  network: string;
  symbol: string;
  id: string;
}

export interface IProtocol {
  assets: Asset[];
  protocol: ProtocolProtocol;
  values: Value[];
}

export interface TokenToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export interface TokenElement {
  balance: string;
  token: TokenToken;
  values: Value[];
}
export interface IBalance {
  token: TokenElement;
  unresolvedComponents: number;
  components: IBalance[];
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
export enum Currency {
  Usd = 'usd',
}
export interface Value {
  currency: Currency;
  price: string;
  value: string;
}
export interface Asset {
  apr: null | unknown;
  apy: null | string;
  balance: IBalance;
  claimableTokens: TokenElement[];
  isDebt: boolean;
}

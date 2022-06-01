export interface IBalance {
  ethereum: Network;
  polygon:  Network;
}

export interface Network {
  account:   string;
  chainId:   string;
  values:    Value[];
  protocols: ProtocolElement[];
  tokens:    TokenElement[];
}

export interface ProtocolElement {
  protocol: ProtocolProtocol;
  values:   Value[];
  assets:   Asset[];
}

export interface Asset {
  apr:             null;
  apy:             null | string;
  balance:         Balance;
  isDebt:          boolean;
  claimableTokens: TokenElement[];
}

export interface Balance {
  token:                TokenElement;
  unresolvedComponents: number;
  components:           Balance[];
}

export interface TokenElement {
  token:   TokenToken;
  balance: string;
  values:  Value[];
}

export interface TokenToken {
  address:     string;
  name:        string;
  symbol:      string;
  decimals:    number;
  totalSupply: string;
}

export interface Value {
  currency: Currency;
  price:    string;
  value:    string;
}

export enum Currency {
  Eur = "eur",
  Usd = "usd",
}

export interface ProtocolProtocol {
  id:           string;
  organization: string;
  name:         string;
  version:      string;
  adapterUri:   string;
  forkedFrom:   null;
  chainId:      string;
}

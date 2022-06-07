export interface AssetComponentData {
  address: string;
  symbol: string;
  network: string;
  value: Value;
  balance: string;
  chainId?: number;
  decimals?: number;
}

export interface AssetData {
  network: string;
  symbol: string;
  balance: string;
  name?: string;
  title: string;
  components: AssetComponentData[];
  value: Value;
}

export interface Value {
  currency: string;
  amount: string;
  price?: string;
}

export interface ProtocolData {
  network: string;
  assetValue: Value;
  assets: AssetData[];
  chainId: number;
  claimableValue?: Value;
  claimableRewards?: ClaimableData[];
}

export interface ClaimableData {
  address: string;
  name: string;
  symbol: string;
  balance: string;
  value: Value;
  network: string;
  chainId?: number;
}

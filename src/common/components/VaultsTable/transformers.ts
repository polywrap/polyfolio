import {CurrencySymbol} from 'common/currency/Currency.types';
import {Asset, Balance, ProtocolElement} from 'utils/allNetworksDataFormatting';
import {chainIdToNetwork} from 'utils/constants';
import {toFixed} from 'utils/numberFormatter';
import {AssetComponentData, AssetData, ProtocolData, Value} from './types';
import {getAssetTitle} from './utils';

export const toComponentData = (
  component: Balance,
  network: string,
  chainId: number,
): AssetComponentData => {
  const {address, symbol, decimals} = component.token.token;
  const {balance} = component.token;
  const {value, currency, price} = component.token.values[0];

  return {
    balance: balance,
    symbol: symbol,
    address: address,
    decimals: decimals,
    chainId: chainId,
    network: network,
    value: {
      price: price,
      amount: value,
      currency: currency.toUpperCase(),
    },
  };
};
type NetworkInfo = [network: string, chainId: number];

const toAssetData = (asset: Asset, ...networkInfo: NetworkInfo): AssetData => {
  const components = asset.balance.components.map(
    (component) => toComponentData(component, ...networkInfo), //asset.balance.components.concat(asset.balance.components).map((component) => TO SHOW MORE THAN 3 COMPONENTS
  );

  return {
    name: asset.balance.token.token.name,
    title: getAssetTitle(components),
    network: networkInfo[0],
    balance: asset.balance.token.balance,
    value: {
      amount: asset.balance.token.values[0].value,
      currency: asset.balance.token.values[0].currency.toUpperCase(),
    },
    symbol: asset.balance.token.token.symbol,
    components: components,
  };
};

export const toProtocolData = (protocol: ProtocolElement): ProtocolData => {
  const chainId = Number(protocol.protocol.chainId);
  const networkName = chainIdToNetwork[chainId];

  return {
    network: networkName,
    chainId: chainId,
    assets: protocol.assets.map((asset) => toAssetData(asset, networkName, chainId)),
    assetValue: {
      currency: protocol.values[0].currency.toUpperCase(),
      amount: protocol.values[0].value,
    },
  };
};

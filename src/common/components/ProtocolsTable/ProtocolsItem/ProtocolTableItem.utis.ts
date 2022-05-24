import {rmCommasFromNum} from 'utils/helpers';
import {Asset, IBalance, IProtocol} from './ProtocolTableItem.types';

export const sumProtocolAssetsBalances = (protocol: IProtocol) =>
  protocol.assets.reduce((prev, current) => prev + sumAssetBalances(current), 0);

export const sumAssetBalances = (asset: Asset) =>
  asset.balance.components.reduce(
    (prev, current) => prev + Number(rmCommasFromNum(current.token.values[0].value)),
    0,
  );

export const sumClaimableValues = (protocol: IProtocol) =>
  protocol.assets.reduce((prev, current) => prev + getClaimableValueFromCurrProtocol(current), 0);

export const getClaimableValueFromCurrProtocol = (asset: Asset) => {
  let value = 0;

  asset.balance.components.forEach((component) => {
    asset.claimableTokens.forEach((claimableToken) => {
      if (component.token.token.address === claimableToken.token.address) {
        value = value + Number(claimableToken.values[0].value);
      }
    });
  });

  return value;
};

export const getComponentsFromProtocol = (protocol: IProtocol) =>
  protocol.assets.reduce(
    (prev: IBalance[], asset: Asset) => [...prev, ...asset.balance.components],
    [],
  );

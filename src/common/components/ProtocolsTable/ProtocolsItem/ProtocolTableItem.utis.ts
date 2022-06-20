import {ProtocolElement, Asset, Balance} from 'common/types';
import {rmCommasFromNum} from 'utils/helpers';

export const sumProtocolAssetsBalances = (protocol: ProtocolElement) =>
  protocol.assets.reduce((prev, current) => prev + sumAssetBalances(current), 0);

export const sumAssetBalances = (asset: Asset) =>
  asset.balance.components.reduce(
    (prev, current) => prev + Number(rmCommasFromNum(current.token.values[0].value)),
    0,
  );

export const sumClaimableValues = (protocol: ProtocolElement) =>
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

export const getComponentsFromProtocol = (protocol: ProtocolElement): Balance[] =>
  protocol.assets.reduce(
    (prev: Balance[], asset: Asset) => [...prev, ...asset.balance.components],
    [] as Balance[],
  );

import RoutePath from 'common/modules/routing/routing.enums';
import {AssetData, Balance, ProtocolElement} from 'common/types';
import {chainIdToNetwork} from 'utils/constants';
import {getAssetsValueSum} from 'utils/dataFormatting';
import {rmCommasFromNum} from 'utils/helpers';
import {v4 as uuidv4} from 'uuid';
import {useBalanceData} from '../useBalanceData/useBalanceData';

interface ProtocolAsset {
  protocol: ProtocolElement;
  asset: Balance;
}

export function toAssetData({protocol, asset}: ProtocolAsset): AssetData {
  const token = asset.token;
  const symbol = token.token.symbol;

  const tokenValue = rmCommasFromNum(token.values[0].value);
  const tokenPrice = rmCommasFromNum(token.values[0].price);

  const percent =
    (Number(tokenValue) * 100) / getAssetsValueSum(protocol?.assets.map((a) => a.balance));
  const valueTitle = (Number(tokenValue) * Number(tokenPrice)).toString();

  const chainId = Number(protocol?.protocol.chainId);
  const network = chainIdToNetwork[chainId];

  return {
    link: `${RoutePath.Asset}`,
    secondaryTitle: token.token.name,
    valueSecondaryTitle: tokenValue,
    tokenAddress: token.token.address,
    valueTitle,
    priceTitle: tokenPrice.toString(),
    title: token.token.symbol,
    percent: percent.toString(),
    symbol: symbol.toLowerCase(),
    network,
    chainId,
    protocol: protocol.protocol.id,
    id: uuidv4(),
  };
}

export default function useAsset(assetSymbol: string): AssetData {
  const balanceState = useBalanceData();

  if (balanceState?.assets?.length) {
    const asset = balanceState.assets.find(
      (asset) => asset.token.token.symbol.toLowerCase() === assetSymbol,
    );

    const protocol = balanceState.protocols.find((p) =>
      p.assets.some((a) =>
        a.balance.components.some((c) => c.token.token.symbol === asset.token.token.symbol),
      ),
    );

    return toAssetData({protocol, asset});
  }

  return undefined;
}

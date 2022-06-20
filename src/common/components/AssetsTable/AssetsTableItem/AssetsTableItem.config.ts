import {BalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import {toAssetData} from 'common/hooks/useAsset/useAsset';

const useAssets = (balanceState: BalanceData) => {
  if (balanceState.assets) {
    return balanceState.assets.map((asset) => {
      const protocol = balanceState.protocols.find((p) =>
        p.assets.some((a) =>
          a.balance.components.some((c) => c.token.token.symbol === asset.token.token.symbol),
        ),
      );

      return toAssetData({protocol, asset});
    });
  }
};

export default useAssets;

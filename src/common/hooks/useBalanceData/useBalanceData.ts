import {useState} from 'react';
import useBalance from 'common/hooks/useBalance/useBalance';
import {useEffect} from 'react';
import {SupportedNetwork} from 'common/networks/Networks.config';
import {Balance, Network} from 'common/types';
import {ProtocolElement} from 'common/types';
import {ejectAssetsFromProtocol, getAssetsValueSum} from 'utils/dataFormatting';
import {ReducedBalance} from 'common/types';
import {useNetworks} from 'common/networks/Networks.context';

export interface BalanceData {
  assets: Balance[];
  assetSum: number;
  protocols: ProtocolElement[];
}

export const useBalanceData = (selectedNetworks?: Network[]) => {
  const {balance} = useBalance();
  const {networks} = useNetworks();
  const [state, setState] = useState<BalanceData>({assets: null, protocols: null, assetSum: null});

  const filteredNetworks = selectedNetworks || networks;

  useEffect(() => {
    if (balance && filteredNetworks.length) {
      const res = filteredNetworks.reduce(
        (balanceData: BalanceData, network: Network) => {
          const currentBalance = getBalanceDataAtNetwork(balance, network.name);

          return {
            assets: [...balanceData.assets, ...currentBalance.assets],
            protocols: [...balanceData.protocols, ...currentBalance.protocols],
            assetSum: balanceData.assetSum + currentBalance.assetsSum,
          };
        },
        {assets: [], protocols: [], assetSum: 0} as BalanceData,
      );

      setState(res);
    }
  }, [JSON.stringify(filteredNetworks), balance]);

  return state;
};

const getBalanceDataAtNetwork = (balances: ReducedBalance, networkName: SupportedNetwork) => {
  const balance = balances[networkName];
  const protocols = balance.protocols;

  const assets: Balance[] = protocols
    .reduce((allAssets, protocol) => [...allAssets, ...ejectAssetsFromProtocol(protocol)], [])
    .flat();

  const assetsSum: number = getAssetsValueSum(assets);

  return {
    balance,
    protocols,
    assets,
    assetsSum,
  };
};

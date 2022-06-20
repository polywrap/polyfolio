import {ReducedBalance} from 'common/types';
import {ejectAssetsFromProtocol, getAssetsValueSum} from './dataFormatting';

const allNetworksDataFormatting = (balances: ReducedBalance) => {
  if (balances) {
    const networks = Object.keys(balances);

    const allProtocols = networks.reduce(
      (allProtocols, network) => [...allProtocols, ...balances[network].protocols],
      [],
    );

    const allAssets = allProtocols
      .reduce((allAssets, protocol) => [...allAssets, ...ejectAssetsFromProtocol(protocol)], [])
      .flat();

    const allAssetsSum: number = getAssetsValueSum(allAssets);

    return {
      balances,
      allAssets,
      allProtocols,
      allAssetsSum,
    };
  }
};

export default allNetworksDataFormatting;

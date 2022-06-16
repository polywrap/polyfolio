import allNetworksDataFormatting from './allNetworksDataFormatting';
import networkDataFormatting from './networkDataFormatting';

export default function getFormattedData(balance, chainId?: string) {
  let preparedData = {};

  if (balance) {
    switch (chainId) {
      case 'ethereum':
        preparedData = networkDataFormatting(chainId, balance);
        break;
      case 'ropsten':
        preparedData = networkDataFormatting(chainId, balance);
        break;
      case 'polygon':
        preparedData = networkDataFormatting(chainId, balance);
        break;
      default:
        preparedData = allNetworksDataFormatting(balance);
        break;
    }
  }

  return preparedData;
}

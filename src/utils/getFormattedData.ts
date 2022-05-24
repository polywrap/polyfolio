import allNetworksDataFormatting from './allNetworksDataFormatting';
import networkDataFormatting from './networkDataFormatting';

export default function getFormattedData(balance, page?: string) {
  let preparedData = {};

  if (balance) {
    switch (page) {
      case 'ethereum':
        preparedData = networkDataFormatting(page, balance);
        break;
      case 'ropsten':
        preparedData = networkDataFormatting(page, balance);
        break;
      case 'polygon':
        preparedData = networkDataFormatting(page, balance);
        break;
      default:
        preparedData = allNetworksDataFormatting(balance);
        break;
    }
  }

  return preparedData;
}

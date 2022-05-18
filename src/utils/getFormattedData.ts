import allNetworksDataFormatting from "./allNetworksDataFormatting";
import networkDataFormatting from "./networkDataFormatting";

export default function getFormattedData (balance, name?: string) {
  let preparedData = {};

  if (balance) {
    switch (name) {
      case 'ethereum':
        preparedData = networkDataFormatting(name, balance);
        break;
      case 'ropsten':
        preparedData = networkDataFormatting(name, balance);
        break;
      case 'polygon':
        preparedData = networkDataFormatting(name, balance);
        break;
      default:
        preparedData = allNetworksDataFormatting(balance);
        break;
    }
  }

  return preparedData;
}

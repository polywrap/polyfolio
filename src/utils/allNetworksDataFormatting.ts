import _ from 'lodash';
import {
  ejectAssetsFromProtocol,
  ejectProtocolsFromNetwork,
  getAssetsValueSum
} from './dataFormatting';

const allNetworksDataFormatting = (balance) => {
  let allProtocols = [];
  let allAssets = [];

  _.forEach(balance ?? [], networkData => {
    allProtocols = [...allProtocols, ...ejectProtocolsFromNetwork(networkData)];
  })
  _.forEach(allProtocols, protocol => {
    allAssets = _.flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
  })

  const allAssetsSum: number = getAssetsValueSum(allAssets);

  return {
    balance,
    allAssets,
    allProtocols,
    allAssetsSum,
  }
}

export default allNetworksDataFormatting;

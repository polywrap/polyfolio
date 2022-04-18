import _ from 'lodash';
import {
  ejectAssetsFromProtocol,
  ejectProtocolsFromNetwork,
  getAssetsValueSum
} from './dataFormating';

const allNetworksDataFormating = (balance) => {
  let allProtocols = [];
  let allAssets = [];

  _.forEach(balance ?? [], networkData => {
    allProtocols = [...allProtocols, ...ejectProtocolsFromNetwork(networkData)];
  })
  console.log(allProtocols)
  _.forEach(allProtocols, protocol => {
    allAssets = _.flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
  })
  console.log(allAssets)

  const allAssetsSum = getAssetsValueSum(allAssets);

  return {
    balance,
    allAssets,
    allProtocols,
    allAssetsSum,
  }
}

export default allNetworksDataFormating;

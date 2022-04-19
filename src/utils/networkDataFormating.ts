import _ from 'lodash';
import {
  ejectAssetsFromProtocol,
  ejectProtocolsFromNetwork,
  getAssetsValueSum
} from './dataFormating';

const networkDataFormating = (page, balance) => {
  let preparedData = {};
  let allProtocols = [];
  let allAssets = [];

  allProtocols = [...allProtocols, ...ejectProtocolsFromNetwork(balance[page])];
  _.forEach(allProtocols, protocol => {
    allAssets = _.flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
  })

  const allAssetsSum = getAssetsValueSum(allAssets);

  return preparedData = {
    ...preparedData,
    balance,
    allAssets,
    allProtocols,
    allAssetsSum,
  }
}

export default networkDataFormating;

import _forEach from 'lodash/forEach';
import _flatten from 'lodash/flatten';
import {
  ejectAssetsFromProtocol,
  ejectProtocolsFromNetwork,
  getAssetsValueSum,
} from './dataFormatting';

const networkDataFormatting = (page: string, balance) => {
  let preparedData = {};
  let allProtocols = [];
  let allAssets = [];

  allProtocols = [...allProtocols, ...ejectProtocolsFromNetwork(balance[page])];
  _forEach(allProtocols, (protocol) => {
    allAssets = _flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
  });

  const allAssetsSum: number = getAssetsValueSum(allAssets);

  return (preparedData = {
    ...preparedData,
    balance,
    allAssets,
    allProtocols,
    allAssetsSum,
  });
};

export default networkDataFormatting;

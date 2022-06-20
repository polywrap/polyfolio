import _forEach from 'lodash/forEach';
import _flatten from 'lodash/flatten';
import {ejectAssetsFromProtocol, getAssetsValueSum} from './dataFormatting';
import {AccountBalance} from 'common/types';

const networkDataFormatting = (page: string, balance: AccountBalance) => {
  let preparedData = {};
  let allProtocols = [];
  let allAssets = [];

  allProtocols = [...allProtocols, ...balance[page].protocols];
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

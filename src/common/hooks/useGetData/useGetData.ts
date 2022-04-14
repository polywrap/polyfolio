import {useState, useCallback} from 'react';

import _ from 'lodash';
import {useRecoilValue} from 'recoil';
import {ejectAssetsFromProtocol, getAssetsValueSum} from 'utils/dataFormating';
import balanceState from 'common/modules/atoms/balanceState';

const useGetData = (name?: string) => {
  const balance = useRecoilValue(balanceState);

  const formateData = () => {
    let preparedData = {};

    switch (name) {
      case 'ethereum':
        break;
      case 'ropsten':
        break;
      case 'polygon':
        break;
      default:
        let allAssets = [];
        _.forEach(balance, networkData => {
          allAssets = [...allAssets, ...ejectAssetsFromProtocol(networkData.protocols)];
        })
  
        const allAssetsSum: number = getAssetsValueSum(allAssets);

        console.log(`balance = ${balance}`)
        console.log(`allAssets = ${allAssets}`)
        console.log(`allAssetsSum ${allAssetsSum}`)
  
        preparedData = {
          ...preparedData,
          balance,
          allAssets,
          allAssetsSum,
        }
        break;
    }

    return preparedData;
  }

  return formateData;
}

export default useGetData;


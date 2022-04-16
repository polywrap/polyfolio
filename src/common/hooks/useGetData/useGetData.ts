import _ from 'lodash';
import {useRecoilValue} from 'recoil';
import {ejectAssetsFromProtocol, ejectProtocolsFromNetwork, getAssetsValueSum} from 'utils/dataFormating';
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
        let allProtocols = [];
        let allAssets = [];

        _.forEach(balance ?? [], networkData => {
          allProtocols = [...allProtocols, ...ejectProtocolsFromNetwork(networkData)];
        })
        console.log(allProtocols)
        _.forEach(allProtocols, protocol => {
          allAssets = [...allAssets, ...ejectAssetsFromProtocol(protocol)];
        })
        console.log(allAssets)
  
        const allAssetsSum: number = getAssetsValueSum(allAssets);

        console.log(`balance = ${balance}`)
        console.log(`allAssets = ${allAssets}`)
        console.log(`allAssetsSum ${allAssetsSum}`)
  
        preparedData = {
          ...preparedData,
          balance,
          allAssets,
          allProtocols,
          allAssetsSum,
        }
        break;
    }

    return preparedData;
  }

  return formateData;
}

export default useGetData;


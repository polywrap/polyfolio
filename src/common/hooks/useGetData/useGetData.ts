import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import networkDataFormating from 'utils/networkDataFormating';
import allNetworksDataFormating from 'utils/allNetworksDataFormating';

const useGetData = (name?: string) => {
  const balance = useRecoilValue(balanceState);

  const formateData = () => {
    let preparedData = {};

    switch (name) {
      case 'ethereum':
        preparedData = networkDataFormating(name, balance);
        break;
      case 'ropsten':
        preparedData = networkDataFormating(name, balance);
        break;
      case 'polygon':
        preparedData = networkDataFormating(name, balance);
        break;
      default:
        preparedData = allNetworksDataFormating(balance);
        break;
    }

    return preparedData;
  }

  return formateData;
}

export default useGetData;


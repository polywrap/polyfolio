import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import networkDataFormatting from 'utils/networkDataFormatting';
import allNetworksDataFormatting from 'utils/allNetworksDataFormatting';

const useActualFormattedData = (name?: string) => {
  const balance = useRecoilValue(balanceState);

  const formatData = () => {
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

  return formatData;
}

export default useActualFormattedData;


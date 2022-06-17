import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {rmCommasFromNum} from 'utils/helpers';
import {getAssetsValueSum} from 'utils/dataFormatting';
import {useNetworks} from 'common/networks/Networks.context';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {AccountBalance, Network} from 'common/types';
import {chainIdToNetwork} from 'utils/constants';

const getNetworkInfo = (balance: AccountBalance, network: Network) => {
  const {name, title} = network;
  const assetSum = balance && getAssetsValueSum(balance[network.name]);

  return {
    id: name.toLowerCase(),
    title: title,
    icon: iconsObj[name] as string,
    link: RoutePath.Network,
    assetSum: assetSum && rmCommasFromNum(assetSum.toString()),
    networkData: network,
  };
};

const useNetworkInfo = (chainId: string) => {
  const balance = useRecoilValue(balanceState);
  const {networks} = useNetworks();

  console.log('useNetworkInfo');

  return (
    balance &&
    getNetworkInfo(
      balance[chainIdToNetwork[chainId]],
      networks.find((n) => n.chainId === Number(chainId)),
    )
  );
};

export default useNetworkInfo;

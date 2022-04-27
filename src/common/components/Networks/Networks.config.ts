import {NetworksItem} from './Networks.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {rmCommasFromNum} from 'utils/helpers';
import _ from 'lodash';
import {ejectAssetsFromProtocol, getAssetsValueSum} from 'utils/dataFormatting';
import {useNetworks} from 'common/networks/Networks.context';

const useNetwork = () => {
  const formatData = useGetData();
  const preparedData = formatData();
  const {network} = useNetworks();
  const menuItems: NetworksItem[] = [];
  
  if (preparedData['balance']) {
    network.forEach(item => {
      let allAssets = [];
      const name = item['name'];
      _.forEach(preparedData['balance'][name]?.protocols, protocol => {
        allAssets = _.flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
      })

      const allAssetsSum = getAssetsValueSum(allAssets);

      if (item.checked) menuItems.push({
        title: item.title,
        secondaryTitle: rmCommasFromNum(allAssetsSum.toString()),
        icon: iconsObj[name] as string,
        link: RoutePath.Network,
        id: name.toLowerCase(),
      })
    })
  }

  return menuItems;
}

export default useNetwork;

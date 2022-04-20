import {NetworksItem} from './Networks.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {networks} from 'utils/constants';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {rmCommasFromNum} from 'utils/helpers';
import _ from 'lodash';
import {ejectAssetsFromProtocol, getAssetsValueSum} from 'utils/dataFormatting';

const useNetworks = () => {
  const formatData = useGetData();
  const preparedData = formatData();
  const menuItems: NetworksItem[] = [];
  
  if (preparedData['balance']) {
    networks.forEach(item => {
      let allAssets = [];
      _.forEach(preparedData['balance'][item.name]?.protocols, protocol => {
        allAssets = _.flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
      })

      const allAssetsSum = getAssetsValueSum(allAssets);

      return menuItems.push({
        title: item.title,
        secondaryTitle: rmCommasFromNum(allAssetsSum.toString()),
        icon: iconsObj[item.name] as string,
        link: RoutePath.Network,
        id: item.name.toLowerCase(),
      })
    })
  }

  return menuItems;
}

export default useNetworks;

import {NetworksItem} from './Networks.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {rmCommasFromNum} from 'utils/helpers';
import _ from 'lodash';
import {ejectAssetsFromProtocol, getAssetsValueSum} from 'utils/dataFormatting';
import {useNetworks} from 'common/networks/Networks.context';
import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';

const useNetwork = () => {
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance);
  const {networks} = useNetworks();
  const menuItems: NetworksItem[] = [];

  if (preparedData['balance']) {
    networks.forEach((item) => {
      let allAssets = [];
      const name = item['name'];
      _.forEach(preparedData['balance'][name]?.protocols, (protocol) => {
        allAssets = _.flatten([...allAssets, ...ejectAssetsFromProtocol(protocol)]);
      });

      const allAssetsSum = getAssetsValueSum(allAssets);

      if (item.checked)
        menuItems.push({
          title: item.title,
          secondaryTitle: rmCommasFromNum(allAssetsSum.toString()),
          icon: iconsObj[name] as string,
          link: RoutePath.Network,
          id: name.toLowerCase(),
        });
    });
  }

  return menuItems;
};

export default useNetwork;

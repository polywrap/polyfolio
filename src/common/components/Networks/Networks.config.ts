import { NetworksItem } from './Networks.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import balanceState from 'common/modules/atoms/balanceState';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import {networks} from 'utils/constants';

const useNetworks = () => {
  const balance = useRecoilValue(balanceState);
  const menuItems: NetworksItem[] = [];

  if (balance) {
    networks.forEach(item => {
      return menuItems.push({
        title: item.title,
        secondaryTitle: '5323.39',
        icon: iconsObj.ethereum,
        link: RoutePath.Network,
        id: item.chainId,
      })
    })
  }

  return menuItems;
}

export default useNetworks;

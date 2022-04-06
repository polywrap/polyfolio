import { NetworksItem } from './Networks.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
/* import { balanceState } from 'common/hooks/useBalance/useBalance';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

const GetNetworks = () => {
  const balance = useRecoilValue(balanceState);
  const menuItems: NetworksItem[] = [];

  if (balance) {
    for (let i = 0; i < balance.network.length; i++) {
      return menuItems.push({
        title: 'eth',
        secondaryTitle: '5323.39',
        icon: iconsObj.ethereum,
        link: RoutePath.Network,
        id: 1,
      })
    }
  }
} */

const menuItems: NetworksItem[] = [
  {
    title: 'eth',
    secondaryTitle: '5323.39',
    icon: iconsObj.ethereum,
    link: RoutePath.Network,
    id: 1,
  },
];

export { menuItems };

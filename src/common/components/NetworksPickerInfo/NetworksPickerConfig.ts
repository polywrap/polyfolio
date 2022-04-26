import {NetworksPickerItem} from './NetworksPickerItem.types';
import {networks} from 'utils/constants';
import _map from 'lodash/map'

const menuItems: NetworksPickerItem[] = _map(networks, network => {
  return {
    ...network,
    checked: true,
    icon: '',
    id: network.chainId
  }
});

export {menuItems};

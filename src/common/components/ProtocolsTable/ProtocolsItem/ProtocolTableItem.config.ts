import {ProtocolsItem} from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {balanceState} from 'common/hooks/useData/useData';
import { useRecoilValue } from 'recoil';

export const GetProtocols = () => {
  const balance = useRecoilValue(balanceState);
  const menuItems: ProtocolsItem[] = [];
  
  if (balance) {
    for (let i = 0; i < balance?.protocols.length; i++) {
      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: 777,
        secondaryTitlePercent: 777,
        claimableValue: 777,
        valueTitle: balance?.protocols[i].assets[0].values[0].value,
        valueIsMinus: false,
        title: balance?.protocols[i].protocol.name,
        id: i + 1,
      })
    }
  }

  return menuItems;
}

export default GetProtocols;

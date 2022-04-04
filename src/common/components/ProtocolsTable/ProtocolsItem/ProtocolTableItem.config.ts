import {ProtocolsItem} from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {balanceState} from 'common/hooks/useData/useData';
import {useRecoilValue} from 'recoil';
import {rmCommasFromNum} from 'utils/helpers';

export const GetProtocols = () => {
  const balance = useRecoilValue(balanceState);
  const menuItems: ProtocolsItem[] = [];
  
  if (balance) {
    for (let i = 0; i < balance?.protocols.length; i++) {
      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: rmCommasFromNum(777),
        secondaryTitlePercent: rmCommasFromNum(777),
        claimableValue: rmCommasFromNum(777),
        valueTitle: rmCommasFromNum(balance?.protocols[i].assets[0].balance.token.values[0].value),
        valueIsMinus: false,
        title: balance?.protocols[i].protocol.name,
        id: balance?.protocols[i].protocol.id,
      })
    }
  }

  return menuItems;
}

export default GetProtocols;

import {ProtocolsItem} from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import balanceState from 'common/modules/atoms/balanceState';
import {useRecoilValue} from 'recoil';
import {rmCommasFromNum} from 'utils/helpers';

export const useProtocols = () => {
  const balance = useRecoilValue(balanceState);
  const menuItems: ProtocolsItem[] = [];
  
  if (balance) {
    for (let i = 0; i < balance?.ethereum.protocols.length; i++) {
      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: rmCommasFromNum(777),
        secondaryTitlePercent: rmCommasFromNum(777),
        claimableValue: rmCommasFromNum(777),
        valueTitle: rmCommasFromNum(balance?.ethereum.protocols[i].assets[0].balance.token.values[0].value),
        valueIsMinus: false,
        title: balance?.ethereum.protocols[i].protocol.name,
        id: balance?.ethereum.protocols[i].protocol.id,
      })
    }
  }

  return menuItems;
}

export default useProtocols;

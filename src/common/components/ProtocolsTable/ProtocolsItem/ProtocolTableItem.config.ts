import { ProtocolsItem } from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import useData from 'common/hooks/useData/useData';

export const GetProtocols = () => {
  const {balance} = useData();
  const menuItems: ProtocolsItem[] = [];
  const divider = {
    title: 'divider',
    isDivider: true,
  }
  const protocols = balance?.protocols;
  console.log(protocols)
  
  if (protocols) {
    for (let i = 0; i < protocols.length; i++) {
      console.log(protocols[i].protocol.name)
      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: 777,
        secondaryTitlePercent: 777,
        claimableValue: 777,
        valueTitle: protocols[i].assets[0].values[0].value,
        valueIsMinus: false,
        title: protocols[i].protocol.name,
        id: i + 1,
      })
      menuItems.push(divider)
    }
  }

  return menuItems;
}

export default GetProtocols;

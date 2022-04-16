import {ProtocolsItem} from './ProtocolTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {rmCommasFromNum} from 'utils/helpers';
import useGetData from 'common/hooks/useGetData/useGetData';
import _ from 'lodash';
import { tokenToString } from 'typescript';

export const useProtocols = () => {
  const formateData = useGetData();
  const preparedData = formateData();
  const menuItems: ProtocolsItem[] = [];
  
  if (preparedData['allProtocols']) {
    for (let i = 0; i < preparedData['allProtocols'].length; i++) {
      let valueTitle = 0;
      _.forEach(preparedData['allProtocols'][i].assets, asset => {
        valueTitle += _.sumBy(asset['balance'].components, assetItem => 
          Number(rmCommasFromNum(assetItem['token'].values[0].value))
        )
      })

      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: rmCommasFromNum(777),
        secondaryTitlePercent: rmCommasFromNum(777),
        claimableValue: rmCommasFromNum(777),
        valueTitle: valueTitle.toString(),
        valueIsMinus: false,
        title: preparedData['allProtocols'][i].protocol.name,
        id: preparedData['allProtocols'][i].protocol.id,
      })
    }
  }

  return menuItems;
}

export default useProtocols;

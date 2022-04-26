import {ProtocolsItem} from './ProtocolTableItem.types';
import { v4 as uuidv4 } from 'uuid';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {getStringFromPath, rmCommasFromNum} from 'utils/helpers';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import _ from 'lodash';
import {useLocation} from 'react-router-dom';
import {chainIdToNetwork} from 'utils/constants';
import {getClaimableValueFromCurrProtocol} from 'utils/dataFormatting';

export const useProtocols = () => {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 2);
  const formatData = useGetData(page);
  const preparedData = formatData();
  const menuItems: ProtocolsItem[] = [];
  const allProtocols = preparedData['allProtocols'];
  
  if (allProtocols) {
    for (let i = 0; i < allProtocols.length; i++) {
      let valueTitle = 0;
      let claimableValue = 0;
      _.forEach(allProtocols[i].assets, asset => {
        valueTitle += _.sumBy(asset['balance'].components, assetItem => 
          Number(rmCommasFromNum(assetItem['token'].values[0].value))
        )
        claimableValue += getClaimableValueFromCurrProtocol(asset);
      })

      const network = allProtocols[i].protocol.chainId;

      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: '???',
        secondaryTitlePercent: '???',
        claimableValue,
        valueTitle: valueTitle.toString(),
        valueIsMinus: false,
        title: preparedData['allProtocols'][i].protocol.name,
        network: chainIdToNetwork[network],
        symbol: preparedData['allProtocols'][i].protocol.id,
        id: uuidv4(),
      })
    }
  }

  return menuItems;
}

export default useProtocols;

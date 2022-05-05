import iconsObj from 'assets/icons/iconsObj';
import { v4 as uuidv4 } from 'uuid';
import {rmCommasFromNum, getStringFromPath} from 'utils/helpers';
import {AssetsItem} from './AssetsTableItem.types';
import RoutePath from 'common/modules/routing/routing.enums';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {useLocation} from 'react-router-dom';
import {detectProtocolAndChainIdForAsset} from 'utils/dataFormatting';
import { chainIdToNetwork } from 'utils/constants';

const useAssets = () => {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 4);
  const formatData = useGetData(chainIdToNetwork[page]);
  const preparedData = formatData();

  const menuItems: AssetsItem[] = [];
  
  const allProtocols = preparedData ? preparedData['allProtocols'] : null;
  const allAssets = preparedData ? preparedData['allAssets'] : null;
  const assetsSum = preparedData ? preparedData['allAssetsSum'] : null;
  
  if (allAssets) {
    for (let i = 0; i < allAssets.length; i++) {
      const percent = Number(rmCommasFromNum(allAssets[i].token.values[0].value)) * 100 / assetsSum;
      const valueTitle = (
        Number(rmCommasFromNum(allAssets[i].token.values[0].value))
        * Number(rmCommasFromNum(allAssets[i].token.values[0].price))
      ).toString();

      const symbol = allAssets[i].token.token.symbol;
      const [network, protocol] = detectProtocolAndChainIdForAsset(allProtocols, symbol);

      menuItems.push({
        secondaryPricePercentTitle: '???',
        link: `${RoutePath.Asset}`,
        secondaryTitle: allAssets[i].token.token.name,
        valueSecondaryTitle: rmCommasFromNum(allAssets[i].token.values[0].value),
        pricePercentDollar: '???',
        iconInfoPage: iconsObj.usdt,
        icon: iconsObj.assetsUsdt,
        valueTitle,
        valueIsMinus: false,
        priceTitle: rmCommasFromNum(allAssets[i].token.values[0].price),
        title: allAssets[i].token.token.symbol,
        percent: percent.toString(),
        symbol: symbol.toLowerCase(),
        network, 
        protocol,
        id: uuidv4(),
      });
    }
  }

  return menuItems;
}

export default useAssets;

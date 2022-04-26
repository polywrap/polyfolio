import iconsObj from 'assets/icons/iconsObj';
import { v4 as uuidv4 } from 'uuid';
import {rmCommasFromNum} from 'utils/helpers';
import {AssetsItem} from './AssetsTableItem.types';
import RoutePath from 'common/modules/routing/routing.enums';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {useLocation} from 'react-router-dom';
import {getStringFromPath} from 'utils/helpers';

const useAssets = () => {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 2);
  const formatData = useGetData(page);
  const preparedData = formatData();

  const menuItems: AssetsItem[] = [];
  
  const allAssets = preparedData ? preparedData['allAssets'] : null;
  const assetsSum = preparedData ? preparedData['allAssetsSum'] : null;
  
  if (allAssets) {
    for (let i = 0; i < allAssets.length; i++) {
      const percent = Number(rmCommasFromNum(allAssets[i].token.values[0].value)) * 100 / assetsSum;

      menuItems.push({
        secondaryPricePercentTitle: '???',
        link: `${RoutePath.Asset}`,
        secondaryTitle: allAssets[i].token.token.name,
        valueSecondaryTitle: rmCommasFromNum(allAssets[i].token.values[0].value),
        pricePercentDollar: '???',
        iconInfoPage: iconsObj.usdt,
        icon: iconsObj.assetsUsdt,
        valueTitle: rmCommasFromNum(allAssets[i].token.values[0].value),
        valueIsMinus: false,
        priceTitle: rmCommasFromNum(allAssets[i].token.values[0].price),
        title: allAssets[i].token.token.symbol,
        percent: percent.toString(),
        symbol: allAssets[i].token.token.symbol.toLowerCase(),
        id: uuidv4(),
      });
    }
  }

  return menuItems;
}

export default useAssets;

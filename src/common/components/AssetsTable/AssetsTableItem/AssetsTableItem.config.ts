import {AssetsItem} from './AssetsTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {useRecoilValue} from 'recoil';
import {allAssetsState, allAssetsSumState} from 'common/hooks/useData/useData';
import {rmCommasFromNum} from 'utils/helpers';


const GetItems = () => {
  const allAssets = useRecoilValue(allAssetsState);
  const allAssetsSum = useRecoilValue(allAssetsSumState);
  const menuItems: AssetsItem[] = [];

  if (allAssets) {
    for (let i = 0; i < allAssets.length; i++) {
      menuItems.push({
        secondaryPricePercentTitle: 777,
        link: `${RoutePath.Asset}`,
        secondaryTitle: allAssets[i].balance.token.token.name,
        valueSecondaryTitle: rmCommasFromNum(allAssets[i].balance.token.values[0].value),
        pricePercentDollar: rmCommasFromNum(777),
        iconInfoPage: iconsObj.usdt,
        icon: iconsObj.assetsUsdt,
        valueTitle: rmCommasFromNum(allAssets[i].balance.token.values[0].value),
        valueIsMinus: false,
        priceTitle: rmCommasFromNum(allAssets[i].balance.token.values[0].price),
        title: allAssets[i].balance.token.token.symbol,
        percent: Number(rmCommasFromNum(allAssets[i].balance.token.values[0].value)) * 100 / allAssetsSum,
        id: allAssets[i].balance.token.token.symbol.toLowerCase(),
      });
    }
  }

  return menuItems;
}

export default GetItems;

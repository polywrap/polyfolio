import { AssetsItem } from './AssetsTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import { useRecoilValue } from 'recoil';
import { allAssetsState, allAssetsSumState } from 'common/hooks/useData/useData';
import { formatInputNumbers } from 'utils/helpers';


const GetItems = () => {
  const allAssets = useRecoilValue(allAssetsState);
  const allAssetsSum = useRecoilValue(allAssetsSumState);
  const menuItems: AssetsItem[] = [];

  if (allAssets) {

    for (let i = 0; i < allAssets.length; i++) {
      menuItems.push({
        title: 'divider',
        isDivider: true,
      });
      menuItems.push({
        secondaryPricePercentTitle: 777,
        link: `${RoutePath.Asset}`,
        secondaryTitle: 'usdtSecondary',
        valueSecondaryTitle: allAssets[i].values[0].value,
        pricePercentDollar: 777,
        iconInfoPage: iconsObj.usdt,
        icon: iconsObj.assetsUsdt,
        valueTitle: allAssets[i].values[0].value,
        valueIsMinus: false,
        priceTitle: allAssets[i].values[0].price,
        title: 'usdt',
        percent: Number(formatInputNumbers(allAssets[i].values[0].value)) * 100 / allAssetsSum,
        id: i + 1,
      });
    }
  }

  return menuItems;
}

export default GetItems;

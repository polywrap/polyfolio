import {useRecoilValue} from 'recoil';
import iconsObj from 'assets/icons/iconsObj';
import {rmCommasFromNum} from 'utils/helpers';
import {AssetsItem} from './AssetsTableItem.types';
import RoutePath from 'common/modules/routing/routing.enums';
import balanceState from 'common/modules/atoms/balanceState';
import useGetData from 'common/hooks/useGetData/useGetData';
//import { useLocation } from 'react-router-dom';
//import {getStringFromPath} from 'utils/helpers';

const useAssets = () => {
  //const {pathname} = useLocation();
  //console.log(pathname);
  //const page = getStringFromPath(pathname, 2);
  //console.log(page);
  const balance = useRecoilValue(balanceState);
  const formateData = useGetData();
  const preparedData = balance ? formateData() : null;

  const menuItems: AssetsItem[] = [];
  console.log(balance);
  console.log(preparedData);
  
  const allAssets = preparedData ? preparedData['allAssets'] : null;
  const assetsSum = preparedData ? preparedData['allAssetsSum'] : null;
  console.log(assetsSum)
  
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
        percent: Number(rmCommasFromNum(allAssets[i].balance.token.values[0].value)) * 100 / assetsSum,
        id: allAssets[i].balance.token.token.symbol.toLowerCase(),
      });
    }
  }

  return menuItems;
}

export default useAssets;

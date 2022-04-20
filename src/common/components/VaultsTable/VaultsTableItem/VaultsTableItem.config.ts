import iconsObj from 'assets/icons/iconsObj';
import { getStringFromPath, rmCommasFromNum } from 'utils/helpers';
import _ from 'lodash';
import useGetData from 'common/hooks/useGetData/useGetData';
import { useLocation } from 'react-router-dom';

export const GetVaults = () => {
  const { pathname } = useLocation()
  const page = getStringFromPath(pathname, 1);
  const formateData = useGetData(page);
  const preparedData = formateData();

  return _.map(preparedData['allAssets'], asset => {    
    return {
      secondaryPricePercentTitle: rmCommasFromNum('777'),
      secondaryTitle: preparedData['allAssetsSum'],
      pricePercentDollar: rmCommasFromNum('777'),
      icon: iconsObj.assetsUsdt,
      valueTitle: rmCommasFromNum('777'),
      valueIsMinus: false,
      priceTitle: rmCommasFromNum(asset.token.values[0].value),
      title: asset.token.token.symbol,
      percent: Number(rmCommasFromNum(asset.token.values[0].value)) * 100 / preparedData['allAssetsSum'],
      id: asset.token.token.symbol.toLowerCase(),
    }
  })
}

export default GetVaults;

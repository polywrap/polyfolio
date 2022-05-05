import iconsObj from 'assets/icons/iconsObj';
import {getStringFromPath, rmCommasFromNum} from 'utils/helpers';
import _ from 'lodash';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {useLocation} from 'react-router-dom';
import {getClaimableValue} from 'utils/dataFormatting';

export const GetVaults = () => {
  const {pathname} = useLocation()
  const page = getStringFromPath(pathname, 1);
  const formatData = useGetData(page);
  const preparedData = formatData();

  return _.map(preparedData['allAssets'], asset => {
    return {
      secondaryPricePercentTitle: '???',
      secondaryTitle: rmCommasFromNum(asset.token.values[0].value),
      pricePercentDollar: '???',
      icon: iconsObj.assetsUsdt,
      valueTitle: getClaimableValue(preparedData['allProtocols'], asset.token.token.address),
      valueIsMinus: false,
      priceTitle: rmCommasFromNum(asset.token.values[0].value),
      title: asset.token.token.symbol,
      percent: Number(rmCommasFromNum(asset.token.values[0].value)) * 100 / preparedData['allAssetsSum'],
      id: asset.token.token.symbol.toLowerCase(),
    }
  })
}

export default GetVaults;

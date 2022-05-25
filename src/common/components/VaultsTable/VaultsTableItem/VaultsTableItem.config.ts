import iconsObj from 'assets/icons/iconsObj';
import {getStringFromPath, rmCommasFromNum} from 'utils/helpers';
import _ from 'lodash';
import {useLocation} from 'react-router-dom';
import {getClaimableValue} from 'utils/dataFormatting';
import balanceState from 'common/modules/atoms/balanceState';
import {useRecoilValue} from 'recoil';
import getFormattedData from 'utils/getFormattedData';

export const useValuts = () => {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 1);
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance, page);

  return _.map(preparedData['allAssets'], (asset) => {
    return {
      secondaryPricePercentTitle: '???',
      secondaryTitle: rmCommasFromNum(asset.token.values[0].value),
      pricePercentDollar: asset.token.values[0]?.price,
      icon: iconsObj.assetsUsdt,
      valueTitle: getClaimableValue(preparedData['allProtocols'], asset.token.token.address),
      valueIsMinus: false,
      priceTitle: rmCommasFromNum(asset.token.values[0].value),
      title: asset.token.token.symbol,
      percent:
        (Number(rmCommasFromNum(asset.token.values[0].value)) * 100) / preparedData['allAssetsSum'],
      id: asset.token.token.symbol.toLowerCase(),
    };
  });
};

export default useValuts;

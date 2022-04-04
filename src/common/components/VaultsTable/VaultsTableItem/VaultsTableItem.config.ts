import {VaultItem} from './VaultsTableItem.types';
import iconsObj from 'assets/icons/iconsObj';
import {useRecoilValue} from 'recoil';
import currentProtocol from 'common/modules/atoms/currentProtocol'
import {rmCommasFromNum, getAssetsValueSum} from 'utils/helpers';
import _ from 'lodash';

export const GetVaults = () => {
  const protocol = useRecoilValue(currentProtocol);
  const assetsTotalValue = getAssetsValueSum(protocol?.assets);

  return _.map(protocol?.assets, asset => {
    return {
      secondaryPricePercentTitle: rmCommasFromNum(777),
      secondaryTitle: asset.balance.token.token.name,
      pricePercentDollar: rmCommasFromNum(777),
      icon: iconsObj.assetsUsdt,
      valueTitle: rmCommasFromNum(777),
      valueIsMinus: false,
      priceTitle: rmCommasFromNum(asset.balance.token.values[0].value),
      title: asset.balance.token.token.symbol,
      percent: Number(rmCommasFromNum(asset.balance.token.values[0].value)) * 100 / assetsTotalValue,
      id: asset.balance.token.token.symbol.toLowerCase(),  
    }
  })
}

export default GetVaults;

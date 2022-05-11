/* eslint-disable react-hooks/rules-of-hooks */
import {v4 as uuidv4} from 'uuid';
import {rmCommasFromNum, getStringFromPath} from 'utils/helpers';
import {AssetsItem} from './AssetsTableItem.types';
import RoutePath from 'common/modules/routing/routing.enums';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {useLocation} from 'react-router-dom';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import {
  detectProtocolAndChainIdForAsset,
  getPriceChangeCurrency,
  getPriceChangePercentage
} from 'utils/dataFormatting';
import {chainIdToNetwork, networkToChainId} from 'utils/constants';
import {useCurrency} from 'common/currency/Currency.context';
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';
import useAssetPageData from 'common/hooks/useAssetPageData/useAssetPageData';

const useAssets = (dataRange?: DataRangeSelectorItem) => {
  const {currency} = useCurrency();
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 4);
  const formatData = useGetData(chainIdToNetwork[page]);
  const preparedData = formatData();

  const menuItems: AssetsItem[] = [];
  
  const allProtocols = preparedData ? preparedData['allProtocols'] : null;
  const allAssets = preparedData ? preparedData['allAssets'] : null;
  const assetsSum = preparedData ? preparedData['allAssetsSum'] : null;
  let assetPreparedData;
  
  if (allAssets) {
    for (let i = 0; i < allAssets.length; i++) {
      const percent = Number(rmCommasFromNum(allAssets[i].token.values[0].value)) * 100 / assetsSum;
      const valueTitle = (
        Number(rmCommasFromNum(allAssets[i].token.values[0].value))
        * Number(rmCommasFromNum(allAssets[i].token.values[0].price))
        ).toString();
        const priceTitle = rmCommasFromNum(allAssets[i].token.values[0].price);
        
        const symbol = allAssets[i].token.token.symbol;
        const [network, protocol] = detectProtocolAndChainIdForAsset(allProtocols, symbol);
        const assetMetaData = useAssetMetadata(
          network,
          networkToChainId[network],
          allAssets[i].token.token.address
        );

        if (dataRange) {
          assetPreparedData = useAssetPageData(
            currency,
            assetMetaData,
            priceTitle,
            dataRange,  
          );
        }

      menuItems.push({
        secondaryPricePercentTitle: assetPreparedData?.percentage ?? '',
        link: `${RoutePath.Asset}`,
        secondaryTitle: allAssets[i].token.token.name,
        valueSecondaryTitle: rmCommasFromNum(allAssets[i].token.values[0].value),
        pricePercentDollar: assetPreparedData?.pricePercentDollar ?? '',
        iconInfoPage: assetMetaData?.image.large,
        icon: assetMetaData?.image.small,
        valueTitle,
        valueIsMinus: assetPreparedData?.style === 'profit' ? false : true,
        priceTitle,
        title: allAssets[i].token.token.symbol,
        percent: percent.toString(),
        symbol: symbol.toLowerCase(),
        address: allAssets[i].token.token.address,
        network, 
        protocol,
        id: uuidv4(),
      });
    }
  }

  return menuItems;
}

export default useAssets;

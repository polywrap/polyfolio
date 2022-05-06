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
import { useCurrency } from 'common/currency/Currency.context';

const useAssets = () => {
  const {currency} = useCurrency();
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
        const assetMetaData = useAssetMetadata(
          network,
          networkToChainId[network],
          allAssets[i].token.token.address
        );
        const [percentage, style] = getPriceChangePercentage(
          assetMetaData?.market_data.price_change_percentage_24h
        );
        console.log(assetMetaData)
        const pricePercentDollar = getPriceChangeCurrency(
          currency,
          assetMetaData?.market_data.price_change_percentage_24h_in_currency
        );

      menuItems.push({
        secondaryPricePercentTitle: percentage,
        link: `${RoutePath.Asset}`,
        secondaryTitle: allAssets[i].token.token.name,
        valueSecondaryTitle: rmCommasFromNum(allAssets[i].token.values[0].value),
        pricePercentDollar,
        iconInfoPage: assetMetaData?.image.large,
        icon: assetMetaData?.image.small,
        valueTitle,
        valueIsMinus: style === 'profit' ? false : true,
        priceTitle: rmCommasFromNum(allAssets[i].token.values[0].price),
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

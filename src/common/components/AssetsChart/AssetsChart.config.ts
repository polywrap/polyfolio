import { useCurrency } from 'common/currency/Currency.context';
import {useParams} from 'react-router-dom';
import _find from 'lodash/find';
import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import {networkToChainId} from 'utils/constants';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import {getPriceChangeCurrency, getPriceChangePercentage} from 'utils/dataFormatting';

const useAsserChartConfig = () => {
  const {currency} = useCurrency();
  const {network, asset} = useParams();
  const menuItems = useAssets();
  const assetData = _find(menuItems, {symbol: asset});
  console.log(assetData)
  console.log(network)

  const assetMetaData = useAssetMetadata(
    assetData?.network,
    networkToChainId[assetData?.network],
    assetData?.address
  );
  console.log(assetMetaData)

  const [percentage, style] = getPriceChangePercentage(
    assetMetaData?.market_data.price_change_percentage_24h
  );
  console.log(percentage)
  const pricePercentDollar = getPriceChangeCurrency(
    currency,
    assetMetaData?.market_data.price_change_percentage_24h_in_currency
  );

  return {
    title: assetData?.priceTitle,
    secondaryTitleValue: pricePercentDollar,
    secondaryTitlePercent: percentage,
    style,
  }
}

export default useAsserChartConfig;

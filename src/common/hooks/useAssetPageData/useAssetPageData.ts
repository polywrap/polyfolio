/* eslint-disable max-params */
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';
import {
  getMarketCap,
  getPriceChangeCurrency,
  getPriceChangePercentage,
  getVolume,
} from 'utils/dataFormatting';

function getAssetPageData(
  currency: string,
  assetMetaData,
  price?: string,
  dataRange?: DataRangeSelectorItem,
) {
  /*   console.log('__________________________________________')
  console.log('currency', currency)
  console.log('assetMetaData', assetMetaData)
  console.log('price', price)
  console.log('price', price) */

  if (assetMetaData) {
    let percentage: string, style: string;
    let pricePercentDollar: string;
    const marketCap = getMarketCap(currency, assetMetaData?.market_data.market_cap);
    const volume = getVolume(currency, assetMetaData?.market_data.total_volume);

    switch (dataRange?.title) {
      case 'd':
        [percentage, style] = getPriceChangePercentage(
          assetMetaData?.market_data.price_change_percentage_24h,
        );
        pricePercentDollar = percentage
          ? ((Number(percentage) * Number(price)) / 100).toString()
          : '';

        return {
          marketCap,
          volume,
          percentage,
          style,
          pricePercentDollar,
        };
      case 'h':
        pricePercentDollar = getPriceChangeCurrency(
          currency,
          assetMetaData?.market_data.price_change_percentage_1h_in_currency,
        );
        style = pricePercentDollar ? (pricePercentDollar[0] === '-' ? 'loss' : 'profit') : '';
        percentage = pricePercentDollar
          ? ((Number(pricePercentDollar) * Number(price)) / 100).toString()
          : '';

        return {
          marketCap,
          volume,
          percentage,
          style,
          pricePercentDollar,
        };
      case 'w':
        [percentage, style] = getPriceChangePercentage(
          assetMetaData?.market_data.price_change_percentage_7d,
        );
        pricePercentDollar = percentage
          ? ((Number(percentage) * Number(price)) / 100).toString()
          : '';

        return {
          marketCap,
          volume,
          percentage,
          style,
          pricePercentDollar,
        };
      case 'm':
        [percentage, style] = getPriceChangePercentage(
          assetMetaData?.market_data.price_change_percentage_30d,
        );
        pricePercentDollar = percentage
          ? ((Number(percentage) * Number(price)) / 100).toString()
          : '';

        return {
          marketCap,
          volume,
          percentage,
          style,
          pricePercentDollar,
        };
      default:
        break;
    }
  }
}

export default getAssetPageData;

import {DataRangeSelectorItem} from "common/components/DateRangeSelector/DataRangeSelector.types";
import { getMarketCap, getPriceChangeCurrency, getPriceChangePercentage, getVolume } from "utils/dataFormatting";

export const useAssetPageData = (
  currency: string,
  assetMetaData,
  dataRange?: DataRangeSelectorItem,
) => {
  let percentage: string, style: string;
  let pricePercentDollar: string;
  const marketCap = getMarketCap(currency, assetMetaData?.market_data.market_cap);
  const volume = getVolume(currency, assetMetaData?.market_data.total_volume);

  switch (dataRange.title) {
    case 'd':
      [percentage, style] = getPriceChangePercentage(
        assetMetaData?.market_data.price_change_percentage_24h
      );
      pricePercentDollar = getPriceChangeCurrency(
        currency,
        assetMetaData?.market_data.price_change_percentage_24h_in_currency
      );

    return {
      marketCap,
      volume,
      percentage,
      style,
      pricePercentDollar,
    }
    case 'h':
      pricePercentDollar = getPriceChangeCurrency(
        currency,
        assetMetaData?.market_data.price_change_percentage_1h_in_currency
      );

      return {
        marketCap,
        volume,
        percentage,
        style,
        pricePercentDollar,
      }
    case 'w':
      [percentage, style] = getPriceChangePercentage(
        assetMetaData?.market_data.price_change_percentage_7d
      );
      pricePercentDollar = getPriceChangeCurrency(
        currency,
        assetMetaData?.market_data.price_change_percentage_7d_in_currency
      );
    break;
    case 'm':
      [percentage, style] = getPriceChangePercentage(
        assetMetaData?.market_data.price_change_percentage_30d
      );
      pricePercentDollar = getPriceChangeCurrency(
        currency,
        assetMetaData?.market_data.price_change_percentage_30d_in_currency
      );
    break;
    default:
    break;
  }
}

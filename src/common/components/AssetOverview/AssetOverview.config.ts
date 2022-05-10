import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import _find from 'lodash/find';
import {useParams} from 'react-router-dom';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import {networkToChainId} from 'utils/constants';
import numberFormatter from 'utils/numberFormatter';
import {useCurrency} from 'common/currency/Currency.context';
import {getMarketCap, getPriceChangePercentage, getVolume} from 'utils/dataFormatting';
import {shortenedAddress} from 'utils/helpers';
import useAuth from 'common/hooks/useAuth/useAuth';
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';

const useAssetOverviewData = (dataRange: DataRangeSelectorItem) => {
  const {user} = useAuth();
  const {asset} = useParams();
  const {currency} = useCurrency();
  const menuItems = useAssets();
  const assetData = _find(menuItems, { symbol: asset });
  const assetMetaData = useAssetMetadata(
    assetData?.network,
    networkToChainId[assetData?.network],
    assetData?.address
  );
  const marketCap = getMarketCap(currency, assetMetaData?.market_data.market_cap);
  const volume = getVolume(currency, assetMetaData?.market_data.total_volume);
  const [percentage, style] = getPriceChangePercentage(
    assetMetaData?.market_data.price_change_percentage_24h
  );

  return {
    row1Items: [
      {
        id: 1,
        label: `${shortenedAddress(user, 4)} Owns`,
        content: `${numberFormatter({
          value: assetData.valueSecondaryTitle,
          size: 2
        })} ${assetMetaData?.symbol.toUpperCase()}`,
        type: "main",
      },
      {
        id: 2,
        label: "Valued at",
        content: "$???",
        type: "common",
      },
      {
        id: 3,
        label: `Change (${dataRange.title.toUpperCase()})`,
        content: (style === 'profit' ? '+' : '')
        + numberFormatter({
          value: percentage,
          size: 2
        }) + '%',
        type: style,
      },
    ],
    row2Items: [
      {
        id: 1,
        label: "Market Cap",
        content: '$'
        +numberFormatter({
          value: marketCap,
          size: 2
        }),
        type: "common",
      },
      {
        id: 2,
        label: "Circulating Supply",
        content: '$'
          +numberFormatter({
            value: assetMetaData?.market_data.circulating_supply,
            size: 2
          }) + ` ${assetMetaData?.symbol.toUpperCase()}`,
        type: "common",
      },
      {
        id: 3,
        label: `Volume (${dataRange.title.toUpperCase()})`,
        content: '$'
        +numberFormatter({
          value: volume,
          size: 2
        }),
        type: "common",
      },
    ]
  }
}

export default useAssetOverviewData;

import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import _find from 'lodash/find';
import {useParams} from 'react-router-dom';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import {networkToChainId} from 'utils/constants';
import numberFormatter from 'utils/numberFormatter';
import {useCurrency} from 'common/currency/Currency.context';
import {shortenedAddress} from 'utils/helpers';
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';
import useAssetPageData from 'common/hooks/useAssetPageData/useAssetPageData';
import { useRecoilValue } from 'recoil';
import { userPersistState } from 'common/modules/atoms/userAddress';

const useAssetOverviewData = (dataRange: DataRangeSelectorItem) => {
  const user = useRecoilValue(userPersistState);
  const {asset} = useParams();
  const {currency} = useCurrency();
  const menuItems = useAssets();
  const assetData = _find(menuItems, { symbol: asset });
  
  const assetMetaData = useAssetMetadata(
    assetData?.network,
    networkToChainId[assetData?.network],
    assetData?.address
  );
  const assetPreparedData = useAssetPageData(
    currency,
    assetMetaData,
    assetData?.priceTitle,
    dataRange,  
  );

  const valuedAt = (Number(assetData?.priceTitle) * Number(assetData?.valueSecondaryTitle)).toString();

  return {
    row1Items: [
      {
        id: 1,
        label: `${shortenedAddress(user, 4)} Owns`,
        content: `${numberFormatter({
          value: assetData?.valueSecondaryTitle,
          size: 2
        })} ${assetMetaData?.symbol.toUpperCase()}`,
        type: "main",
      },
      {
        id: 2,
        label: "Valued at",
        content: `$${numberFormatter({
          value: valuedAt,
          size: 2
        })}`,
        type: "common",
      },
      {
        id: 3,
        label: `Change (1${dataRange?.title?.toUpperCase()})`,
        content: (assetPreparedData?.style === 'profit' ? '+' : '')
        + numberFormatter({
          value: assetPreparedData?.percentage,
          size: 2
        }) + '%',
        type: assetPreparedData?.style,
      },
    ],
    row2Items: [
      {
        id: 1,
        label: "Market Cap",
        content: '$'
        +numberFormatter({
          value: assetPreparedData?.marketCap,
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
        label: `Volume (1${dataRange?.title?.toUpperCase()})`,
        content: '$'
        +numberFormatter({
          value: assetPreparedData?.volume,
          size: 2
        }),
        type: "common",
      },
    ]
  }
}

export default useAssetOverviewData;

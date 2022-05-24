import {useCurrency} from 'common/currency/Currency.context';
import {useParams} from 'react-router-dom';
import _find from 'lodash/find';
import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import {networkToChainId} from 'utils/constants';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import useAssetPageData from 'common/hooks/useAssetPageData/useAssetPageData';
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';

const useAssetChartConfig = (dataRange: DataRangeSelectorItem) => {
  const {currency} = useCurrency();
  const {asset} = useParams();
  const menuItems = useAssets();
  const assetData = _find(menuItems, {symbol: asset});

  const assetMetaData = useAssetMetadata(
    assetData?.network,
    networkToChainId[assetData?.network],
    assetData?.address,
  );

  const assetPreparedData = useAssetPageData(
    currency,
    assetMetaData,
    assetData?.priceTitle,
    dataRange,
  );

  return {
    title: assetData?.priceTitle,
    secondaryTitleValue: assetPreparedData?.pricePercentDollar,
    secondaryTitlePercent: assetPreparedData?.percentage,
    style: assetPreparedData?.style,
  };
};

export default useAssetChartConfig;

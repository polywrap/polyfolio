import React, {useState} from 'react';
import DashboardPage from '../DashboardPage';
import HeaderCurrencyPage from 'pages/HeaderCurrencyPage/HeaderCurrencyPage';
import AssetsCharts from 'common/components/AssetsChart/AssetsChart';
import AssetTransaction from 'common/components/AssetOverview/AssetTransaction';
import AssetOverview from 'common/components/AssetOverview/AssetOverview';
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';
import useAsset from 'common/hooks/useAsset/useAsset';
import {useParams} from 'react-router-dom';

function AssetPage() {
  const [dataRange, setDataRange] = useState<DataRangeSelectorItem>({});
  const [isOpen, setIsOpen] = useState(true);
  const {asset: assetSymbol} = useParams();
  const assetData = useAsset(assetSymbol);

  const changeDataRange = (e) => {
    setDataRange(e);
    setIsOpen(!isOpen);
  };

  return (
    <DashboardPage>
      <HeaderCurrencyPage asset={assetData} />
      <AssetsCharts
        changeDataRange={changeDataRange}
        dataRange={dataRange}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <AssetOverview dataRange={dataRange} />
      {assetData && <AssetTransaction tokenAddress={assetData?.tokenAddress} />}
    </DashboardPage>
  );
}

export default AssetPage;

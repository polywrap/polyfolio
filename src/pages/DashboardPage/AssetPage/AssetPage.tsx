import React, {useState} from 'react';
import DashboardPage from '../DashboardPage';
import HeaderCurrencyPage from 'pages/HeaderCurrencyPage/HeaderCurrencyPage';
import AssetsCharts from 'common/components/AssetsChart/AssetsChart';
import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';
import AssetOverview from 'common/components/AssetOverview/AssetOverview';

function AssetPage() {
  const [dataRange, setDataRange] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  const changeDataRange = (e) => {
    setDataRange(e);
    setIsOpen(!isOpen);
  };

  return (
    <DashboardPage>
      <HeaderCurrencyPage />
      <AssetsCharts
        changeDataRange={changeDataRange} 
        dataRange={dataRange}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <AssetOverview dataRange={dataRange} />
      <AssetTransaction />
    </DashboardPage>
  );
}

export default AssetPage;

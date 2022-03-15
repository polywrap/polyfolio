import React from 'react';
import DashboardPage from '../DashboardPage';
import HeaderCurrencyPage from 'pages/HeaderCurrencyPage/HeaderCurrencyPage';
import AssetsCharts from 'common/components/AssetsChart/AssetsChart';
import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';
import AssetOverview from 'common/components/AssetOverview/AssetOverview';

function AssetPage() {
  return (
    <DashboardPage>
      <HeaderCurrencyPage />
      <AssetsCharts />
      <AssetOverview />
      <AssetTransaction />
    </DashboardPage>
  );
}

export default AssetPage;

import React from 'react';
import Networks from 'common/components/Networks/Networks';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import DashboardNavigation from 'common/components/DashboardNavigation/DashboardNavigation';
import HeaderDashboard from 'common/components/HeaderDashboard/HeaderDashboard';
import DashboardPage from '../DashboardPage';
import {useBalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import useAssets from 'common/components/AssetsTable/AssetsTableItem/AssetsTableItem.config';

function Portfolio() {
  const balanceData = useBalanceData();
  const assets = useAssets(balanceData);

  return (
    <DashboardPage>
      <HeaderDashboard />
      <DashboardNavigation />
      <AssetsTable assets={assets} total={balanceData.assetSum} />
      <ProtocolsTable protocols={balanceData.protocols} />
      <Networks />
    </DashboardPage>
  );
}

export default Portfolio;

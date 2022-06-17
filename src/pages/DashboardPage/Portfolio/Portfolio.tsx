import React from 'react';
import Networks from 'common/components/Networks/Networks';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import DashboardNavigation from 'common/components/DashboardNavigation/DashboardNavigation';
import HeaderDashboard from 'common/components/HeaderDashboard/HeaderDashboard';
import DashboardPage from '../DashboardPage';
import {useBalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import useAssets from 'common/components/AssetsTable/AssetsTableItem/AssetsTableItem.config';
import useBalance from 'common/hooks/useBalance/useBalance';

function Portfolio() {
  const balanceData = useBalanceData();
  const assets = useAssets(balanceData);
  const {balance} = useBalance();

  return (
    <DashboardPage>
      <HeaderDashboard />
      <DashboardNavigation />
      <AssetsTable assets={assets} total={balanceData.assetSum} />
      <ProtocolsTable protocols={balanceData.protocols} />
      {balance && <Networks />}
    </DashboardPage>
  );
}

export default Portfolio;

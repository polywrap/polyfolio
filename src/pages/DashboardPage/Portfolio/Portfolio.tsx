import React, {useEffect} from 'react';
import Networks from 'common/components/Networks/Networks';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import DashboardNavigation from 'common/components/DashboardNavigation/DashboardNavigation';
import HeaderDashboard from 'common/components/HeaderDashboard/HeaderDashboard';
import DashboardPage from '../DashboardPage';

function Portfolio() {
  return (
    <DashboardPage>
      <HeaderDashboard />
      <DashboardNavigation />
      <AssetsTable />
      <ProtocolsTable />
      <Networks />
    </DashboardPage>
  );
}

export default Portfolio;

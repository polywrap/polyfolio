import React from 'react';
import Networks from 'common/components/Networks/Networks';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import PerformanceTable from 'common/components/PerformanceTable/PerformanceTable';
import AssetsCharts from 'common/components/AssetsChart/AssetsChart';
import DashboardPage from '../DashboardPage';

function Portfolio() {
  return (
    <DashboardPage>
      <AssetsCharts />
      <PerformanceTable />
      <AssetsTable />
      <ProtocolsTable />
      <Networks />
    </DashboardPage>
  );
}

export default Portfolio;

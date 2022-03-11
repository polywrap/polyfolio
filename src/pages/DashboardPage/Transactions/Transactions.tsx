import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';
import React from 'react';
import DashboardPage from '../DashboardPage';
import DashboardNavigation from 'common/components/DashboardNavigation/DashboardNavigation';
import HeaderDashboard from 'common/components/HeaderDashboard/HeaderDashboard';
import ButtonCsv from 'common/components/ButtonCsv/ButtonCsv';

function Transactions() {
  return (
    <DashboardPage>
      <HeaderDashboard />
      <DashboardNavigation />
      <AssetTransaction />
      <ButtonCsv />
    </DashboardPage>
  );
}

export default Transactions;

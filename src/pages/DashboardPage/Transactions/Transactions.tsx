import UserTransaction from 'common/components/UserTransaction/UserTransaction';
import React from 'react';
import DashboardPage from '../DashboardPage';
import DashboardNavigation from 'common/components/DashboardNavigation/DashboardNavigation';
import HeaderDashboard from 'common/components/HeaderDashboard/HeaderDashboard';

function Transactions() {
  return (
    <DashboardPage>
      <HeaderDashboard />
      <DashboardNavigation />
      <UserTransaction />
    </DashboardPage>
  );
}

export default Transactions;

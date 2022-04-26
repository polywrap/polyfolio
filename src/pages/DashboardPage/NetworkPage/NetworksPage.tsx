import React from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import {useParams} from 'react-router-dom';
import useNetworks from 'common/components/Networks/Networks.config';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import DashboardPage from '../DashboardPage';

function NetworksPage() {
  const translation = useTranslation();
  const {id} = useParams();
  const menuItems = useNetworks();
  const current = _find(menuItems, {id});

  return (
    <DashboardPage>
      <HeaderPage
        title={`${current?.title} ${translation.Networks.network}`}
        icon={current?.icon}
      />
      <HeaderPageInfo title={current?.secondaryTitle} />
      <AssetsTable />
      <ProtocolsTable />
    </DashboardPage>
  );
}
export default NetworksPage;

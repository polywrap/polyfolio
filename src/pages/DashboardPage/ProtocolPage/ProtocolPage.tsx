import React from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import { useParams } from 'react-router-dom';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import GetProtocols from 'common/components/ProtocolsTable/ProtocolsItem/ProtocolTableItem.config';
import VaultsTable from 'common/components/VaultsTable/VaultsTable';
import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';
import DashboardPage from '../DashboardPage';

function ProtocolPage() {
  const translation = useTranslation();
  const {id} = useParams();
  const menuItems = GetProtocols();
  const current = _find(menuItems, {symbol: id});

  return (
    <DashboardPage>
      <HeaderPage
        title={`${current?.title} ${translation.Protocols.protocol}`}
        icon={current?.icon}
      />
      <HeaderPageInfo title={current?.valueTitle} />
      <VaultsTable />
      <AssetTransaction />
    </DashboardPage>
  );
}

export default ProtocolPage;

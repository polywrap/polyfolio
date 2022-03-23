import React from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import {useParams} from 'react-router-dom';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import GetProtocols from 'common/components/ProtocolsTable/ProtocolsItem/ProtocolTableItem.config';
import VaultsTable from 'common/components/VaultsTable/VaultsTable';
import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';

function ProtocolsInfo() {
  const translation = useTranslation();
  const {id: idNetworks} = useParams();
  const menuItems = GetProtocols();
  const current = _find(menuItems, {id: +idNetworks});

  return (
    <>
      <HeaderPage
        title={`${translation.Protocols[current.title]} ${translation.Networks.network}`}
        icon={current?.icon}
      />
      <HeaderPageInfo title={current.valueTitle} />
      <VaultsTable />
      <AssetTransaction />
    </>
  );
}

export default ProtocolsInfo;

import React from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import {useParams} from 'react-router-dom';
import {menuItems} from 'common/components/Networks/Networks.config';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';

function NetworksInfo() {
  const translation = useTranslation();
  const {id: idNetworks} = useParams();
  const current = _find(menuItems, {id: +idNetworks});

  return (
    <>
      <HeaderPage
        title={`${translation.Networks[current.title]} ${translation.Networks.network}`}
        icon={current?.icon}
      />
      <HeaderPageInfo title={current.secondaryTitle} />
      <AssetsTable />
      <ProtocolsTable />
    </>
  );
}
export default NetworksInfo;

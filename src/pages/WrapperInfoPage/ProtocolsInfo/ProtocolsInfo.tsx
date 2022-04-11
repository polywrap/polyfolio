import React, { useEffect, useState } from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import { useParams } from 'react-router-dom';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import _map from 'lodash/find';
import GetProtocols from 'common/components/ProtocolsTable/ProtocolsItem/ProtocolTableItem.config';
import VaultsTable from 'common/components/VaultsTable/VaultsTable';
import AssetTransaction from 'common/components/AssetTransaction/AssetTransaction';
import currentProtocol from 'common/modules/atoms/currentProtocol';
import {useRecoilState, useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {getAssetsValueSum} from 'utils/dataFormating';

function ProtocolsInfo() {
  const [currProtocol, setCurrProtocol] = useRecoilState(currentProtocol);
  const [totalTableValue, setTotalTableValue] = useState<number>(0);
  const balance = useRecoilValue(balanceState);
  const translation = useTranslation();
  const { id } = useParams();
  const menuItems = GetProtocols();
  const current = _find(menuItems, { id });

  useEffect(() => {
    if (!currProtocol) {
      _map(balance?.protocols, (protocol) => {
        if (protocol.protocol.id === current.id) {
          setCurrProtocol(protocol);
        }
      });
    }
  }, [balance?.protocols, currProtocol, current.id, setCurrProtocol])

  useEffect(() => {
    if (currProtocol) {
      setTotalTableValue(getAssetsValueSum(currProtocol.assets))
    }
  }, [currProtocol])

  return (
    <>
      <HeaderPage
        title={`${current?.title} ${translation.Networks.network}`}
        icon={current?.icon}
      />
      <HeaderPageInfo title={current?.valueTitle} />
      <VaultsTable totalTableValue={totalTableValue} />
      <AssetTransaction />
    </>
  );
}

export default ProtocolsInfo;

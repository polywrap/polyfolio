import React, {useEffect, useState} from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import {useParams} from 'react-router-dom';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import useProtocols from 'common/components/ProtocolsTable/ProtocolsItem/ProtocolTableItem.config';
import VaultsTable from 'common/components/ProtocolPage/Vaults/VaultsTable';
//import AssetTransaction from 'common/components/UserTransaction/UserTransaction';
import DashboardPage from '../DashboardPage';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {toProtocolData} from 'common/components/ProtocolPage/shared/transformers';
import {chainIdToNetwork} from 'utils/constants';
import {AccountBalance} from 'utils/allNetworksDataFormatting';
import {ProtocolData} from 'common/components/ProtocolPage/shared/types';
import ClaimableTable from 'common/components/ProtocolPage/Claimable/ClaimableTable';

export const getProtocol = (
  balance: Record<string, AccountBalance>,
  chainId: string,
  protocolId: string,
) => {
  if (balance) {
    const network = chainIdToNetwork[chainId];
    const protocolsAtChain = balance[network];

    const protocolProtocol = protocolsAtChain.protocols.find(
      ({protocol}) => protocol.id === protocolId,
    );

    return protocolProtocol;
  }
};

function ProtocolPage() {
  const translation = useTranslation();
  const {protocol} = useParams();
  const {data: menuItems} = useProtocols();
  const current = _find(menuItems, {symbol: protocol});

  const [protocolData, setProtocolData] = useState<ProtocolData>(undefined);

  const balance = useRecoilValue(balanceState);

  const {chainId, protocol: protocolId} = useParams();

  useEffect(() => {
    if (balance) {
      const protocol = getProtocol(balance, chainId, protocolId);

      if (protocol) {
        const transformed = toProtocolData(protocol);
        setProtocolData(transformed);
      }
    }
  }, [balance]);

  return (
    <DashboardPage>
      <HeaderPage
        title={`${current?.title} ${translation.Protocols.protocol}`}
        icon={current?.icon}
      />
      <HeaderPageInfo title={current?.valueTitle} />
      <VaultsTable protocolData={protocolData} />
      {protocolData?.claimableRewards && <ClaimableTable protocolData={protocolData} />}
      {/* <AssetTransaction /> */}
    </DashboardPage>
  );
}

export default ProtocolPage;

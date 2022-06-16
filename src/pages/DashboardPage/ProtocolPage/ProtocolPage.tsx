import React, {useEffect, useState} from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import {useParams} from 'react-router-dom';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import VaultsTable from 'common/components/ProtocolPage/Vaults/VaultsTable';
//import AssetTransaction from 'common/components/UserTransaction/UserTransaction';
import DashboardPage from '../DashboardPage';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {toProtocolData} from 'common/components/ProtocolPage/shared/transformers';
import {chainIdToNetwork} from 'utils/constants';
import {AccountBalance} from 'common/types';
import {ProtocolData} from 'common/components/ProtocolPage/shared/types';
import ClaimableTable from 'common/components/ProtocolPage/Claimable/ClaimableTable';
import {sumProtocolAssetsBalances} from 'common/components/ProtocolsTable/ProtocolsItem/ProtocolTableItem.utis';
import iconsObj from 'assets/icons/iconsObj';

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

interface ProtocolPageState extends ProtocolData {
  valueTitle?: string;
  title?: string;
  icon?: string;
}

function ProtocolPage() {
  const translation = useTranslation();
  const balance = useRecoilValue(balanceState);
  const {chainId, protocol: protocolId} = useParams();

  const [protocolData, setProtocolData] = useState<ProtocolPageState>(undefined);

  useEffect(() => {
    if (balance) {
      const protocol = getProtocol(balance, chainId, protocolId);

      if (protocol) {
        const transformed = toProtocolData(protocol);
        const data = {
          ...transformed,
          valueTitle: sumProtocolAssetsBalances(protocol).toString(),
          title: protocol.protocol.name,
          icon: iconsObj[protocol.protocol.id] as string,
        };
        setProtocolData(data);
      }
    }
  }, [balance]);

  return (
    <DashboardPage>
      <HeaderPage
        title={`${protocolData?.title} ${translation.Protocols.protocol}`}
        icon={protocolData?.icon}
      />
      <HeaderPageInfo title={protocolData?.valueTitle} />
      <VaultsTable protocolData={protocolData} />
      {protocolData?.claimableRewards && <ClaimableTable protocolData={protocolData} />}
      {/* <AssetTransaction /> */}
    </DashboardPage>
  );
}

export default ProtocolPage;

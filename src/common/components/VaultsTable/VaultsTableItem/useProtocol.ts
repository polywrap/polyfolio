import balanceState from 'common/modules/atoms/balanceState';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {AccountBalance, ProtocolElement} from 'utils/allNetworksDataFormatting';
import {chainIdToNetwork} from 'utils/constants';

export const useProtocol = (user: string, chainId: string, protocolId: string) => {
  const balance = useRecoilValue<Record<string, AccountBalance>>(balanceState);
  const [protocol, setProtocol] = useState<ProtocolElement>(undefined);

  useEffect(() => {
    if (user && chainId && protocolId) {
      const network = chainIdToNetwork[chainId];
      const protocolsAtChain = balance[network];

      //console.log('protocol', protocolsAtChain);

      const protocolProtocol = protocolsAtChain.protocols.find(
        ({protocol}) => protocol.id === protocolId,
      );

      setProtocol(protocolProtocol);
      //console.log('protocolProtocol', protocolProtocol);
    }
  }, [balance]);

  return protocol;
};

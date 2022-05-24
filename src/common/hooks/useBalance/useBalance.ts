import {useCallback, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import balanceState from 'common/modules/atoms/balanceState';
import {insertChainIdToProtocol} from 'utils/dataFormatting';
import {getAccountBalance} from './getAccountBalance';
import {useNetworks} from 'common/networks/Networks.context';
//import {getCONFIG} from 'utils/constants';

export default function useBalance(address: string) {
  const client = useWeb3ApiClient();
  const {network} = useNetworks();

  const [balance, setBalance] = useRecoilState(balanceState);

  const balanceRequest = useCallback(
    async (chainId?: number) => {
      const {data: response, errors} = await getAccountBalance(
        client,
        {accountAddress: address},
        {chainId},
      );

      if (response && !errors?.length) {
        return response?.getAccountBalance;
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    },
    [address, client],
  );

  const getBalance = useCallback(async () => {
    if (address) {
      let temporaryBalance = {};

      for (let i = 0; i < network.length; i++) {
        if (network[i].checked) {
          const name = network[i].name;
          const chainId = network[i].chainId;

          const response = await balanceRequest(chainId);
          temporaryBalance = {...temporaryBalance, [name]: response};
        }
      }

      insertChainIdToProtocol(temporaryBalance);

      setBalance(temporaryBalance);
    }
  }, [address, balanceRequest, network, setBalance]);

  useEffect(() => {
    if (address) {
      getBalance();
    }
  }, [address, getBalance]);

  return balance;
}

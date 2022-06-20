import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import balanceState from 'common/modules/atoms/balanceState';
import {insertChainIdToProtocol} from 'utils/dataFormatting';
import {getAccountBalance} from './getAccountBalance';
import {useNetworks} from 'common/networks/Networks.context';
import {ReducedBalance} from 'common/types';

interface UseBalanceReturnProps {
  balance: ReducedBalance;
  fetchBalances: (address: string) => Promise<void>;
}

export default function useBalance(): UseBalanceReturnProps {
  const client = useWeb3ApiClient();
  const {networks} = useNetworks();

  const [balance, setBalance] = useRecoilState<ReducedBalance>(balanceState);

  const fetchBalances = useCallback(async (accountAddress: string) => {
    let temporaryBalance = {};

    for (const network of networks) {
      const {name, chainId} = network;

      const {data: response, errors} = await getAccountBalance(client, {accountAddress}, {chainId});

      if (response && !errors?.length) {
        if (response.getAccountBalance) {
          temporaryBalance = {...temporaryBalance, [name]: response?.getAccountBalance};
        }
      } else {
        // ADD ERROR HANDLER
        console.log(`ERROR getBalance for address:${accountAddress} at chanId:${chainId}`, errors);
      }
    }

    insertChainIdToProtocol(temporaryBalance);

    setBalance(temporaryBalance as ReducedBalance);
  }, []);

  return {balance, fetchBalances};
}

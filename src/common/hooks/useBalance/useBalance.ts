import {useCallback, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import balanceState from 'common/modules/atoms/balanceState';
import {insertChainIdToProtocol} from 'utils/dataFormatting';
import {getAccountBalance} from './getAccountBalance';
import {useNetworks} from 'common/networks/Networks.context';

export default function useBalance(address: string) {
  const client = useWeb3ApiClient();
  const {networks} = useNetworks();

  const [balance, setBalance] = useRecoilState(balanceState);

  const getBalances = useCallback(async (accountAddress: string) => {
    let temporaryBalance = {};

    for await (const network of networks) {
      if (network.checked) {
        const {name, chainId} = network;

        const {data: response, errors} = await getAccountBalance(
          client,
          {accountAddress},
          {chainId},
        );

        if (response && !errors?.length) {
          if (response.getAccountBalance) {
            temporaryBalance = {...temporaryBalance, [name]: response?.getAccountBalance};
          }
        } else {
          // ADD ERROR HANDLER
          console.log(
            `ERROR getBalance for address:${accountAddress} at chanId:${chainId}`,
            errors,
          );
        }
      }
    }

    insertChainIdToProtocol(temporaryBalance);

    setBalance(temporaryBalance);
  }, []);

  useEffect(() => {
    if (address) {
      getBalances(address);
    }
  }, [address]);

  return balance;
}

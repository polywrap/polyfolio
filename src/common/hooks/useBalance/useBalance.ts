import {useCallback, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import balanceState from 'common/modules/atoms/balanceState';
import {insertChainIdToProtocol} from 'utils/dataFormatting';
import {uri, query} from './useBalance.config';
import {useNetworks} from 'common/networks/Networks.context';

export default function useBalance(address: string) {
  const client = useWeb3ApiClient();
  const {network} = useNetworks();

  const [balance, setBalance] = useRecoilState(balanceState);

  const balanceRequest = useCallback(async (/* chainId */) => {
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        accountAddress: address,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      },
    });
    
    if (response && !errors?.length) {
      return response?.getAccountBalance
    }
    else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [address, client])

  const getBalance = useCallback(async () => {
    if (address) {
      let temporaryBalance = {}

      for (let i = 0; i < network.length; i++) {
        if (network[i].checked) {
          const name = network[i].name;
          /* const chainId = network[i].chainId.toString(); */
          
          const response = await balanceRequest(/* chainId */);
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
  }, [address, getBalance])

  return balance;
}

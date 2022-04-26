import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {networks} from 'utils/constants';
import balanceState from 'common/modules/atoms/balanceState';
import {insertChainIdToProtocol} from 'utils/dataFormatting';
import {uri, query} from './useBalance.config';

export default function useBalance() {
  const {user} = useAuth();
  const client = useWeb3ApiClient();

  const [balance, setBalance] = useRecoilState(balanceState);

  const balanceRequest = useCallback(async (chainId, otherUserAddress?) => {
    const { data: response, errors } = await client.query({
      uri,
      query,
      variables: {
        accountAddress: otherUserAddress ?? user,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      },
      config: {
        envs: [
          {
            uri,
            common: {
              connection: {
                node: null,
                networkNameOrChainId: chainId,
              },
            },
            query: {},
            mutation: {},
          },
        ],
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
  }, [client, user])

  const getBalance = useCallback(async (otherUserAddress?) => {
    if (user) {
      let temporaryBalance = {}

      for (let i = 0; i < networks.length; i++) {
        const name = networks[i].name;
        const chainId = networks[i].chainId.toString();

        const response = await balanceRequest(chainId, otherUserAddress);
          temporaryBalance = {...temporaryBalance, [name]: response};
      }

      insertChainIdToProtocol(temporaryBalance);

      setBalance(temporaryBalance);
    }
  }, [balanceRequest, setBalance, user]);

  return {getBalance};
}

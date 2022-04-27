import {useRecoilState} from 'recoil';

import {useWeb3ApiClient} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {useCallback} from 'react';
import tokenTransferState from 'common/modules/atoms/tokenTransferState';
import {useCurrency} from 'common/currency/Currency.context';
import {uri, query, redirects, envsUri, apiKey} from './useTokenTransfers.config'; 


export default function useTokenTransfers() {
  const {user} = useAuth();
  const {currency} = useCurrency();
  const client = useWeb3ApiClient();

  const [, setTokenTransaction] = useRecoilState(tokenTransferState);

  const getTokenTransfers = useCallback(async (token: string, chainId: number) => {
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        account: user,
        token,
        currency,
      },
      config: {
        envs: [
          {
            uri: envsUri.uri_1,
            common: {
              connection: {
                node: null,
                networkNameOrChainId: chainId.toString(),
              },
            },
            query: {},
            mutation: {},
          },
          {
            uri: envsUri.uri_2,
            query: {
              apiKey,
              chainId: chainId.toString(),
            },
            common: {},
            mutation: {},
          },
        ],
        redirects,
      },
    })

    if (response && !errors?.length) {
      const tokenTokenTransfers = response?.getTokenTransfers;

      setTokenTransaction(tokenTokenTransfers);
    } else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [client, setTokenTransaction, user])

  return getTokenTransfers;
}

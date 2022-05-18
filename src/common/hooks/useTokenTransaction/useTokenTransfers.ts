import {useRecoilState, useRecoilValue} from 'recoil';

import {useWeb3ApiClient} from '@web3api/react';
import {useCallback} from 'react';
import tokenTransferState from 'common/modules/atoms/tokenTransferState';
import {useCurrency} from 'common/currency/Currency.context';
import {uri, query, envsUri, apiKey} from './useTokenTransfers.config'; 
import { userPersistState } from 'common/modules/atoms/userAddress';


export default function useTokenTransfers() {
  const user = useRecoilValue(userPersistState);
  const {currency} = useCurrency();
  const client = useWeb3ApiClient();

  const [, setTokenTransaction] = useRecoilState(tokenTransferState);

  const getTokenTransfers = useCallback(async (token: string, chainId: number, search: string) => {
    const account = search ?? user;
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        account,
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
              chainId: chainId,
            },
            common: {},
            mutation: {},
          },
        ],
      },
    })

    if (response && !errors?.length) {
      const tokenTransfers = response?.getTokenTransfers;

      setTokenTransaction(tokenTransfers);
    } else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [client, currency, setTokenTransaction, user])

  return getTokenTransfers;
}

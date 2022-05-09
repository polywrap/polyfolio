import {useRecoilState} from 'recoil';

import {useWeb3ApiClient} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {useCallback} from 'react';
import transactionState from 'common/modules/atoms/transactionState';
import { useCurrency} from 'common/currency/Currency.context';
import {uri, query, redirects, envsUri, apiKey} from './useTransaction.config';


export default function useTransactions() {
  const {user} = useAuth();
  const {currency} = useCurrency();
  const client = useWeb3ApiClient();

  const [, setTransaction] = useRecoilState(transactionState);

  const getTransactions = useCallback(async (otherAddress?: string) => {
    const account = otherAddress ?? user;
    
    if (account) {
      const {data: response, errors} = await client.query({
        uri,
        query,
        variables: {
          account,
          currency,
        },
        config: {
          envs: [
            {
              uri: envsUri.uri_1,
              query: {
                connection: {
                  networkNameOrChainId: "MAINNET",
                },
              },
              mutation: {}
            },
            {
              uri: envsUri.uri_2,
              query: {
                apiKey,
                chainId: 1,
              },
              common: {},
              mutation: {},
            }
          ],
          redirects,
        },
      });

      if (response && !errors?.length) {
        const transactions = response?.getTransactions;
        console.log(transactions)

        setTransaction(transactions);
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    }
  }, [client, currency, setTransaction, user]);

  return getTransactions;
}

import {useRecoilState} from 'recoil';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {useCallback} from 'react';
import transactionState from 'common/modules/atoms/transactionState';
import { useCurrency } from 'common/currency/Currency.context';
import {uri, query, redirects, envsUri, apiKey} from './useTransaction.config'; 


export default function useTransactions() {
  const {user} = useAuth();
  const {currency} = useCurrency();

  const [, setTransaction] = useRecoilState(transactionState);

  const {execute, loading, data} = useWeb3ApiQuery({
    uri,
    query,
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

  const getTransactions = useCallback(async (otherUserAddress?: string) => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        account: otherUserAddress ?? user,
        currency: currency,
      });
  
      if (response && !errors?.length) {
        const transactions = response?.getTransactions;

        setTransaction(transactions);
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    }
  }, [currency, data, execute, loading, setTransaction, user]);

  return {getTransactions};
}

import {atom, useRecoilState} from 'recoil';
import _ from 'lodash';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import { useCallback } from 'react';

const TRANSACTION_STATE_KEY = 'polyfolio_transactions';

export const transactionState = atom({
  key: TRANSACTION_STATE_KEY,
  default: null,
});

export default function useTransactions() {
  const {user} = useAuth();

  const [, setTransaction] = useRecoilState(transactionState);

  const {execute, loading, data} = useWeb3ApiQuery({
    uri: `ens/rinkeby/mock.defiwrapper.eth`,
    query: `query {
      getTransactions(
        accountAddress: $accountAddress
        vsCurrency: $vsCurrency
      )
    }`,
    config: {
      envs: [
        {
          uri: 'ens/rinkeby/mock.defiwrapper.eth',
          common: {
            connection: {
              node: null,
              networkNameOrChainId: '1',
            },
          },
          query: {},
          mutation: {},
        },
      ],
    },
  });

  const getTransactions = useCallback(async () => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        accountAddress: user,
        vsCurrency: 'USDT',
      });
  
      if (response && !errors?.length) {
        const transactions = response?.getTransactions;
        console.log(transactions);

        setTransaction(transactions);
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    }
  }, [data, execute, loading, setTransaction, user]);

  return {getTransactions};
}

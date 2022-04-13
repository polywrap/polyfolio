import {useRecoilState} from 'recoil';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {useCallback} from 'react';
import transactionState from 'common/modules/atoms/transactionState';


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

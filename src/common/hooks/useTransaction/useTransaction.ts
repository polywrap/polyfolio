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
    query: `
    query GetTransactions($account: String!, $currency: String!) {
      getTransactions(
        accountAddress: $account
        vsCurrency: $currency
      )
    }
    `,
    config: {
      envs: [
        {
          uri: "ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth",
          query: {
            connection: {
              networkNameOrChainId: "MAINNET",
            },
          },
          mutation: {}
        },
        {
          uri: "w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth",
          query: {
            apiKey: "ckey_910089969da7451cadf38655ede",
            chainId: 1,
          },
          common: {},
          mutation: {},
        }
      ],
      redirects: [
        {
          to: "w3://ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth",
          from: "w3://ens/ethereum.token-resolvers.defiwrapper.eth",
        }
      ]
    },
  });

  const getTransactions = useCallback(async () => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        account: user,
        currency: 'USDT',
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

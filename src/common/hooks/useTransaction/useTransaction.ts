import {useRecoilState, useRecoilValue} from 'recoil';

import {useWeb3ApiClient} from '@web3api/react';
import {useCallback, useEffect} from 'react';
import transactionState from 'common/modules/atoms/transactionState';
import {useCurrency} from 'common/currency/Currency.context';
import {uri, query} from './useTransaction.config'; 
import {userPersistState} from 'common/modules/atoms/userAddress';
import { getCONFIG } from 'utils/constants';


export default function useTransactions() {
  const client = useWeb3ApiClient();
  const user = useRecoilValue(userPersistState);
  const {currency} = useCurrency();

  const [transactions, setTransaction] = useRecoilState(transactionState);

  const getTransactions = useCallback(async () => {
    if (user) {
      const {data: response, errors} = await client.query({
        uri,
        query,
        variables: {
          account: user,
          currency: currency,
        },
        config: getCONFIG()
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
  }, [client, currency, setTransaction, user]);

  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  return transactions;
}

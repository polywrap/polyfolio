import {useRecoilState, useRecoilValue} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import {useEffect} from 'react';
import transactionState from 'common/modules/atoms/transactionState';
import {useCurrency} from 'common/currency/Currency.context';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {getTransactions} from './useTransaction.config';

export default function useTransactions() {
  const client = useWeb3ApiClient();
  const user = useRecoilValue(userPersistState);
  const {currency} = useCurrency();

  const [transactions, setTransaction] = useRecoilState(transactionState);

  useEffect(() => {
    console.log('USE EFFECT getTransactions');

    if (user) {
      getTransactions(client, {
        account: user,
        currency: currency,
      }).then(({data, errors}) => {
        console.log('data', data);
        console.log('errors', errors);

        if (data && !errors?.length) {
          const transactions = data?.getTransactions;

          setTransaction(transactions);
        } else {
          // ADD ERROR HANDLER
          console.log('getTransactions ERRORS-------');
          console.log(errors);
          console.log('-----ERRORS');
        }
      });
    }
  }, [client, currency, user]);

  return transactions;
}

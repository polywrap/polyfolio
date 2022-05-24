import {useRecoilState, useRecoilValue} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import {useEffect} from 'react';
import transactionState from 'common/modules/atoms/transactionState';
import {useCurrency} from 'common/currency/Currency.context';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {getTransactions} from './useTransaction.config';
import {searchPersistState} from 'common/modules/atoms/searchState';

export default function useTransactions() {
  const client = useWeb3ApiClient();
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);

  const {currency} = useCurrency();

  const [transactions, setTransaction] = useRecoilState(transactionState);

  useEffect(() => {
    console.log(`getTransactions '${currency}' for: ${search ?? user}`);

    if (user) {
      getTransactions(client, {
        account: search ?? user,
        currency: currency,
      }).then(({data, errors}) => {
        if (data && !errors?.length) {
          const transactions = data?.getTransactions;
          console.log('getTransactions', transactions);
          setTransaction(transactions);
        } else {
          // ADD ERROR HANDLER
          console.log('getTransactions ERRORS-------');
          console.log(errors);
          console.log('-----ERRORS');
        }
      });
    }
  }, [client, currency, user, search]);

  return transactions;
}

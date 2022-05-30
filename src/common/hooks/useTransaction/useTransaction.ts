import {useRecoilValue} from 'recoil';
import {useWeb3ApiQuery} from '@web3api/react';
import {useEffect} from 'react';
import {useCurrency} from 'common/currency/Currency.context';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {query, uri, getConfig} from './useTransaction.config';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {TransactionsList, Variables} from './useTransactions.types';

interface Props {
  page?: number;
  perPage?: number;
  config?: {
    chainId?: number;
  };
}

export default function useTransactions({page, perPage = 10, config = {chainId: 1}}: Props) {
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const {currency} = useCurrency();

  const {data, loading, errors, execute} = useWeb3ApiQuery<{getTransactions: TransactionsList}>(
    getConfig({chainId: config.chainId, currency: currency}),
  );

  useEffect(() => {
    if (search || user) {
      console.log(
        `getTransactions for '${
          search || user
        }', page ${page}, perPage: ${perPage}, currency:${currency}`,
      );

      const variables: Variables = {
        account: search ?? user,
        currency: currency,
        options: {
          pagination: {
            page: page,
            perPage: perPage,
          },
          blockRange: null,
        },
      };

      execute(variables);
    }
  }, [page, perPage, search, user, currency]);

  useEffect(() => {
    if (errors) {
      //Handle error here or outside
      console.log('useTransaction Errors', errors);
    }
  }, [errors]);

  return {data, loading, errors};
}

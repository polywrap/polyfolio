import {useWeb3ApiQuery} from '@web3api/react';
import {useCurrency} from 'common/currency/Currency.context';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {Transaction, TransactionsList} from 'common/hooks/useTransaction/useTransactions.types';
import ENS_URI from 'utils/web3apiConfig/ensUri';
import {TokenToken} from 'common/types';

interface Props {
  tokenAddress: string;
  page?: number;
  perPage?: number;
  config?: {
    chainId?: number;
  };
}

export interface TransferTransfer {
  from: string;
  quote: string;
  quoteRate: string;
  to: string;
  type: number;
  value: string;
}

export interface Transfer {
  transfers: TransferTransfer[];
  transaction: Transaction;
}

export interface TokenTransfers extends Omit<TransactionsList, 'transactions'> {
  token: TokenToken;
  transfers: Transfer[];
}

export default function useAssetTranscations({
  tokenAddress,
  page,
  perPage = 10,
  config = {chainId: 1},
}: Props) {
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const {currency} = useCurrency();

  const {data, loading, errors, execute} = useWeb3ApiQuery<{getTokenTransfers: TokenTransfers}>({
    uri: ENS_URI.MOCK,
    query: `query {
        getTokenTransfers(
          accountAddress: $accountAddress
          tokenAddress: $tokenAddress
          options: $options
          vsCurrency: $currencies
        )
      }`,
    config: {
      envs: [
        {
          uri: ENS_URI.ACCOUNT.MOCK,
          common: {
            apiKey: 'ckey_910089969da7451cadf38655ede',
            chainId: config.chainId,
            vsCurrency: currency,
            format: 'JSON',
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (search || user) {
      const variables = {
        accountAddress: search ?? user,
        tokenAddress: tokenAddress,
        currencies: [currency],
        //currencies: [currency],
        options: {
          pagination: {
            page: page,
            perPage: perPage,
          },
          blockRange: null,
        },
      };

      console.log(
        `getTokenTransfers for user '${variables.accountAddress}', address:'${variables.tokenAddress}' page ${variables.options.pagination.page}, perPage: ${variables.options.pagination.perPage}, currency:${currency}`,
      );

      execute(variables);
    }
  }, [page, perPage, search, user, currency]);

  useEffect(() => {
    if (errors) {
      //Handle error here or outside
      console.log('useAssetTransaction Errors', errors);
    }
  }, [errors]);

  return {data, loading, errors};
}

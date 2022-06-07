import {useWeb3ApiQuery} from '@web3api/react';
import {useCurrency} from 'common/currency/Currency.context';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import _find from 'lodash/find';
import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import {Transaction, TransactionsList} from 'common/hooks/useTransaction/useTransactions.types';
import {TokenToken} from 'utils/allNetworksDataFormatting';
import ENS_URI from 'utils/web3apiConfig/ensUri';

interface Props {
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

const DEBUG_ADDRESS =
  '0x2d5863b006b1d03d1259c88d87a351ac78a6c6d0' || '0xdfd5293d8e347dfe59e90efd55b2956a1343963d';

export default function useAssetTranscations({page, perPage = 10, config = {chainId: 1}}: Props) {
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const {currency} = useCurrency();
  const {asset} = useParams();
  const menuItems = useAssets();

  const {data, loading, errors, execute} = useWeb3ApiQuery<{getTokenTransfers: TokenTransfers}>({
    uri: ENS_URI.MOCK, //IPFS_URI.SDK.MOCK,
    query: `query {
        getTokenTransfers(
          accountAddress: $accountAddress
          tokenAddress: $tokenAddress
          options: $options
          vsCurrency: $currencies
        )
      }`,
    config: {
/*       envs: [
        {
          uri: ENS_URI.MOCK,
          common: {
            apiKey: 'ckey_910089969da7451cadf38655ede',
            chainId: config.chainId,
            vsCurrency: currency,
            format: 'JSON',
          },
        },
        {
          uri: 'ipfs/QmU33eyiAsdZaT3pXk2UVGXzYtbYx94RXBUCDzM6fMEBcW',
          common: {
            connection: {
              node: null,
              connectionOrChainId: '1',
            },
          },
        },
      ], */
    },
  });
  console.log('data', data);

  useEffect(() => {
    if (search || user) {
      const assetData = _find(menuItems, {symbol: asset});

      const variables = {
        accountAddress: DEBUG_ADDRESS, //search ?? user , //TODO REMOVE DEBUG ADDRESS
        tokenAddress: assetData.address,
        currencies: [currency],
        //currencies: [currency],
        options: {
          pagination: {
            page: page,
            perPage: 10,
          },
          blockRange: null,
        },
      };

      console.log(
        `getTokenTransfers for user '${variables.accountAddress}', token '${assetData?.secondaryTitle}', address:'${variables.tokenAddress}' page ${variables.options.pagination.page}, perPage: ${variables.options.pagination.perPage}, currency:${currency}`,
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

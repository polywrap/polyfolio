import {useWeb3ApiClient, useWeb3ApiQuery} from '@web3api/react';
import {useCurrency} from 'common/currency/Currency.context';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import _find from 'lodash/find';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';
import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import {Transaction, TransactionsList} from 'common/hooks/useTransaction/useTransactions.types';
import {TokenToken} from 'utils/allNetworksDataFormatting';

interface Props {
  page?: number;
  perPage?: number;
  config?: {
    chainId?: number;
  };
}

interface TransferTransfer {
  from: string;
  quote: string;
  quoteRate: string;
  to: string;
  type: number;
  value: string;
}

interface Transfer {
  transfers: TransferTransfer[];
  transaction: Transaction;
}

interface TokenTransfers extends Omit<TransactionsList, 'transactions'> {
  token: TokenToken;
  transfers: Transfer[];
}

export default function useAssetTranscations({page, perPage = 10, config = {chainId: 1}}: Props) {
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const {currency} = useCurrency();
  const {asset} = useParams();
  const menuItems = useAssets();

  const {data, loading, errors, execute} = useWeb3ApiQuery<{getTokenTransfers: TokenTransfers}>({
    uri: IPFS_URI.SDK.MOCK,
    query: `query {
        getTokenTransfers(
          accountAddress: $accountAddress
          tokenAddress: $tokenAddress
          vsCurrency: $currencies
        )
      }`,
    config: {
      envs: [
        {
          uri: IPFS_URI.ACCOUNT.MOCK,
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
      const assetData = _find(menuItems, {symbol: asset});

      console.log(
        `getTokenTransfers for user '${search || user}', token '${
          assetData?.secondaryTitle
        }', address:'${assetData.address}' page ${page}, perPage: ${perPage}, currency:${currency}`,
      );

      const variables = {
        accountAddress: search ?? user,
        tokenAddress: assetData.address,
        currencies: [currency],
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
      console.log('useAssetTransaction Errors', errors);
    }
  }, [errors]);

  return {data, loading, errors};
}

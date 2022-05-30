import {UseWeb3ApiQueryProps} from '@web3api/react/build/query';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';

// REF = https://github.com/defiwrapper/defiwrapper/blob/main/packages/defi-sdk/resolvers/account-resolvers/interface/query.graphql

export const uri = IPFS_URI.SDK.MOCK;
export const query = `query {
  getTransactions(
    accountAddress: $account
    vsCurrency: $currency
    options: $options
  )
}`;

export const getConfig = ({
  chainId,
  currency,
}: {
  chainId: number;
  currency: string;
}): UseWeb3ApiQueryProps => {
  return {
    uri: uri,
    query: query,
    config: {
      envs: [
        {
          uri: IPFS_URI.SDK.MOCK,
          common: {
            apiKey: 'ckey_910089969da7451cadf38655ede',
            chainId: chainId,
            vsCurrency: currency,
            format: 'JSON',
          },
        },
      ],
    },
  };
};

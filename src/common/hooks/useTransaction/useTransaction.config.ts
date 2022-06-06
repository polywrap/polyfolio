import {UseWeb3ApiQueryProps} from '@web3api/react/build/query';
import ENS_URI from 'utils/web3apiConfig/ensUri';

// REF = https://github.com/defiwrapper/defiwrapper/blob/main/packages/defi-sdk/resolvers/account-resolvers/interface/query.graphql

export const getConfig = ({
  chainId,
  currency,
}: {
  chainId: number;
  currency: string;
}): UseWeb3ApiQueryProps => {
  return {
    uri: ENS_URI.MOCK,
    query: `query {
      getTransactions(
        accountAddress: $account
        vsCurrency: $currency
        options: $options
      )
    }`,
/*     config: {
      envs: [
        {
          uri: ENS_URI.MOCK,
          common: {
            apiKey: 'ckey_910089969da7451cadf38655ede',
            chainId: chainId,
            vsCurrency: currency,
            format: 'JSON',
          },
        },
      ],
    }, */
  };
};

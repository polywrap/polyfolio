import {Web3ApiClient} from '@web3api/client-js';
import {AccountBalance} from 'utils/allNetworksDataFormatting';
import ENS_URI from 'utils/web3apiConfig/ensUri';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';

const defaultVars = {
  vsCurrencies: [],
  noTruncate: false,
  underlyingPrice: false,
};

export const getAccountBalance = (
  client: Web3ApiClient,
  variables: {
    accountAddress: string;
    vsCurrencies?: string[];
    noTruncate?: boolean;
    underlyingPrice?: boolean;
  },
  options = {chainId: 1}, //eslint-disable-line
) => {
  return client.query<{getAccountBalance: AccountBalance}>({
    uri: IPFS_URI.SDK.MOCK,
    query: `query {
      getAccountBalance(
          accountAddress: $accountAddress
          vsCurrencies: $vsCurrencies
          noTruncate: $noTruncate
          underlyingPrice: $underlyingPrice
      )
    }`,
    variables: {...defaultVars, ...variables},
    config: {
      envs: [
        {
          uri: ENS_URI.ACCOUNT.COVALENT,
          query: {
            apiKey: 'ckey_910089969da7451cadf38655ede',
            chainId: options.chainId,
          },
          common: {},
          mutation: {},
        },
      ],
    },
  });
};

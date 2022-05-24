import {Web3ApiClient} from '@web3api/client-js';
import ENS_URI from 'utils/web3apiConfig/ensUri';

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
  return client.query({
    uri: ENS_URI.MOCK,
    query: `query {
      getAccountBalance(
          accountAddress: $accountAddress
          vsCurrencies: $vsCurrencies
          noTruncate: $noTruncate
          underlyingPrice: $underlyingPrice
      )
    }`,
    variables: {...defaultVars, ...variables},
  });
};

import {Web3ApiClient} from '@web3api/client-js';
import ENS_URI from 'utils/web3apiConfig/ensUri';

export const getTokenTransfers = (
  client: Web3ApiClient,
  variables: {accountAddress: string; tokenAddress: string; currency: string},
  options = {chainId: 1},
) => {
  const {accountAddress, tokenAddress, currency} = variables;

  return client.query({
    uri: ENS_URI.MOCK,
    query: `query {
      getTokenTransfers(
        accountAddress: $accountAddress
        tokenAddress: $tokenAddress
        vsCurrency: $vsCurrency
        options: null
      )
    }`,
    variables: {
      accountAddress: accountAddress,
      tokenAddress: tokenAddress,
      vsCurrency: currency,
    },
    config: {
      envs: [
        {
          uri: ENS_URI.ACCOUNT.COVALENT,
          common: {
            chainId: options.chainId,
          },
        },
        /*         {
          uri: 'ipfs/QmdhnYXgxjavFDD9kUJE5BA3UeWGDeMhwwYQoJ1CM4ScTp',
          query: {
            connection: {
              networkNameOrChainId: options.chainId,
            },
          },
        }, */
      ],
    },
  });
};

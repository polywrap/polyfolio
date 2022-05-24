import {QueryApiOptions, Web3ApiClient} from '@web3api/client-js';
import ENS_URI from 'utils/web3apiConfig/ensUri';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';

interface Variables extends Record<string, unknown> {
  tokenAddress: string; //0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5 fro uniswap_v2
  protocolId: string;  // uniswap_v2
}
interface Options {
  chainId: '1' | string;
}

export const getTokenComponent = (
  client: Web3ApiClient,
  variables: Variables,
  options: Options = {chainId: '1'},
) => {
  return client.query({
    uri: ENS_URI.ASSET.UNISWAP,
    query: `query {
    getTokenComponents(
      tokenAddress: $tokenAddress,
      protocolId: $protocolId
    )
  }`,
    variables: variables,
    config: {
      envs: [
        {
          uri: IPFS_URI.ASSET.UNISWAP,
          common: {
            connection: {
              node: null,
              networkNameOrChainId: options.chainId,
            },
          },
        },
        {
          uri: IPFS_URI.TOKEN.ETHEREUM,
          common: {
            connection: {
              node: null,
              networkNameOrChainId: options.chainId,
            },
          },
        },
      ],
    },
  });
};

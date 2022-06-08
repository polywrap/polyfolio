import {Web3ApiClient} from '@web3api/client-js';
import ENS_URI from 'utils/web3apiConfig/ensUri';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';
import {TokenComponent} from './useTokenComponent';

interface Variables extends Record<string, unknown> {
  tokenAddress: string; //0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5 fro uniswap_v2
  protocolId?: string; // uniswap_v2
}
interface Options {
  chainId: '1' | string;
}

export const getTokenComponent = async (
  client: Web3ApiClient,
  variables: Variables,
  options: Options = {chainId: '1'},
): Promise<TokenComponent> => {
  const {data, errors} = await client.query<{getTokenComponents: TokenComponent}>({
    uri: ENS_URI.ASSET.UNISWAP,
    query: `query {
    getTokenComponents(
      tokenAddress: $tokenAddress,
      protocolId: $protocolId
    )
  }`,
    variables: {protocolId: 'uniswap_v2', ...variables} as Variables,
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

  if (errors) {
    console.log(
      `ERROR getTokenComponents for ${variables.tokenAddress} at protocolId: ${variables?.protocolId}`,
      errors,
    );
  }

  return data?.getTokenComponents;
};

import {Web3ApiClient} from '@web3api/client-js';
import {TokenInfo} from './useAssetMetadata.types';

export const uri = 'ens/rinkeby/coingecko.defiwrapper.eth';
export const query = `
query TokenInfo($id: String!, $contract_address: String!){
  tokenInfo(id: $id, contract_address: $contract_address)
}
`;
export const envsUri = {
  uri_1: 'ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth',
  uri_2: 'w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth',
};

export const getAssetMetadata = async (client: Web3ApiClient, {id, tokenAddress, tokenName}) => {
  const {data, errors} = await client.query<{tokenInfo: TokenInfo}>({
    uri,
    query,
    variables: {
      id,
      contract_address: tokenAddress,
    },
  });

  if (errors) {
  /*   console.log(
      `ERROR getAssetMetadata ${tokenName} for ${tokenName} at network: ${id}, ${tokenAddress}`,
      errors,
    ); */
  }

  return data?.tokenInfo;
};

export const apiKey = 'ckey_910089969da7451cadf38655ede';

import {Web3ApiClient} from '@web3api/client-js';
import {TokenToken} from 'common/types';
import ENS_URI from 'utils/web3apiConfig/ensUri';

interface Variables {
  address: string;
  type: string;
}

export const getToken = async (client: Web3ApiClient, {address, type}: Variables) => {
  const {data, errors} = await client.query<{getToken: TokenToken}>({
    uri: ENS_URI.TOKEN.ETHEREUM,
    query: `query {
      getToken(
        address: $address
        type: $type
      )
    }`,
    variables: {
      address,
      type,
    },
  });

  if (errors) {
    console.log(`Error getToken ${address}, ${type}`, errors);
  }

  return data?.getToken;
};

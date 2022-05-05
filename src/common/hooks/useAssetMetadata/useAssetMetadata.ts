import {useWeb3ApiClient} from '@web3api/react';
import {useCallback, useEffect, useState} from 'react';
import {
  uri,
  apiKey,
  envsUri,
  query,
  redirects,
} from './useAssetMetadata.config';

const useAssetMetadata = (id: string, chainId: number, tokenAddrres: string) => {
  const client = useWeb3ApiClient();
  const [asset, setAsset] = useState(null);

  const getAssetMetadata = useCallback(async () => {
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        id,
        contract_address: tokenAddrres,
      },
      config: {
        envs: [
          {
            uri: envsUri.uri_1,
            common: {
              connection: {
                node: null,
                networkNameOrChainId: chainId.toString(),
              },
            },
            query: {},
            mutation: {},
          },
          {
            uri: envsUri.uri_2,
            query: {
              apiKey,
              chainId: chainId.toString(),
            },
            common: {},
            mutation: {},
          },
        ],
        redirects,
      },
    })

    if (response && !errors?.length) {
      const assetData = response;

      setAsset(assetData);
    } else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [chainId, client, tokenAddrres])

  useEffect(() => {
    getAssetMetadata()
  }, [getAssetMetadata])

  return asset;
}

export default useAssetMetadata;

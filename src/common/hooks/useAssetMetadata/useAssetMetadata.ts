import {useWeb3ApiClient} from '@web3api/react';
import {useCallback, useEffect, useState} from 'react';
import {
  uri,
  apiKey,
  envsUri,
  query,
  redirects,
} from './useAssetMetadata.config';

const useAssetMetadata = (id: string, chainId: number, tokenAddress: string) => {
  const client = useWeb3ApiClient();
  const [asset, setAsset] = useState(null);

  const getAssetMetadata = useCallback(async () => {
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        id,
        contract_address: tokenAddress,
      },
      config: {
        envs: [
          {
            uri: envsUri.uri_1,
            common: {
              connection: {
                node: null,
                networkNameOrChainId: chainId?.toString(),
              },
            },
            query: {},
            mutation: {},
          },
          {
            uri: envsUri.uri_2,
            query: {
              apiKey,
              chainId: chainId?.toString(),
            },
            common: {},
            mutation: {},
          },
        ],
        redirects,
      },
    })

    if (response && !errors?.length) {
      const assetData = response?.tokenInfo;

      setAsset(assetData);
    } else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [chainId, client, id, tokenAddress])

  useEffect(() => {
    getAssetMetadata()
  }, [getAssetMetadata, id, chainId, tokenAddress])

  return asset;
}

export default useAssetMetadata;

import {Web3ApiClient} from '@web3api/client-js';
import {useWeb3ApiClient} from '@web3api/react';
import {useCallback, useEffect, useState} from 'react';
import {uri, query} from './useAssetMetadata.config';

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
    });

    if (response && !errors?.length) {
      const assetData = response?.tokenInfo;
      //console.log('assetData', assetData);
      setAsset(assetData);
    } else {
      // ADD ERROR HANDLER
      /* console.log('useAssetMetadata ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS'); */
    }
  }, [client, id, tokenAddress]);

  useEffect(() => {
    getAssetMetadata();
  }, [getAssetMetadata, id, chainId, tokenAddress]);

  return asset;
};

export const getAssetMetadata = async (client: Web3ApiClient, {id, tokenAddress, tokenName}) => {
  const {data, errors} = await client.query({
    uri,
    query,
    variables: {
      id,
      contract_address: tokenAddress,
    },
  });

  if (errors) {
    /*    console.log(
      `ERROR getAssetMetadata ${
        tokenName ? 'for ' + tokenName : ''
      } at network: ${id}, ${tokenAddress}`,
      errors,
    ); */
  }

  return data?.tokenInfo;
};

export default useAssetMetadata;

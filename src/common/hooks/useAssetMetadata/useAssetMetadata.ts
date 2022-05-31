import {Web3ApiClient} from '@web3api/client-js';
import {useWeb3ApiClient} from '@web3api/react';
import {useCache} from 'common/context/cacheContext';
import {useCallback, useEffect, useState} from 'react';
import {uri, query} from './useAssetMetadata.config';
import {TokenInfo} from './useAssetMetadata.types';

const useAssetMetadata = (id: string, chainId: number, tokenAddress: string): TokenInfo => {
  const client = useWeb3ApiClient();
  const [cachedAssetMetadata, setCachedAssetMetadata] = useCache<TokenInfo>(
    `tokenInfo(${id}, ${tokenAddress})`,
  );

  const updateAssetMetadata = useCallback(async () => {
    if (!cachedAssetMetadata) {
      console.log('No cache for', id, tokenAddress);
      const {data: response, errors} = await client.query<{tokenInfo: TokenInfo}>({
        uri,
        query,
        variables: {
          id,
          contract_address: tokenAddress,
        },
      });

      if (response && !errors?.length) {
        const assetData = response?.tokenInfo;
        setCachedAssetMetadata(assetData);
      } else {
        // ADD ERROR HANDLER
        /* console.log('useAssetMetadata ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS'); */
      }
    }
  }, [client, id, tokenAddress]);

  useEffect(() => {
    updateAssetMetadata();
  }, [id, chainId, tokenAddress]);

  return cachedAssetMetadata;
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

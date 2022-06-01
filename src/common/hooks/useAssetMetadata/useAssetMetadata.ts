import {useWeb3ApiClient} from '@web3api/react';
import {useCache} from 'common/context/cacheContext';
import {useCallback, useEffect} from 'react';
import {getAssetMetadata} from './useAssetMetadata.config';
import {TokenInfo} from './useAssetMetadata.types';

const useAssetMetadata = (id: string, chainId: number, tokenAddress: string): TokenInfo => {
  const client = useWeb3ApiClient();
  const [cachedAssetMetadata, setCachedAssetMetadata] = useCache<TokenInfo>(
    `tokenInfo(${id}, ${tokenAddress})`,
  );

  const updateAssetMetadata = useCallback(async () => {
    if (!cachedAssetMetadata) {
      console.log('No cache for', id, tokenAddress);
      const tokenInfo = await getAssetMetadata(client, {id, tokenAddress, tokenName: ''});

      if (tokenInfo) {
        setCachedAssetMetadata(tokenInfo);
      }
    }
  }, [client, id, chainId, tokenAddress]);

  useEffect(() => {
    updateAssetMetadata();
  }, [id, chainId, tokenAddress]);

  cachedAssetMetadata && console.log('From cache for', id, tokenAddress);

  return cachedAssetMetadata;
};

export default useAssetMetadata;

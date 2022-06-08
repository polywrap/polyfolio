import {useWeb3ApiClient} from '@web3api/react';
import {getTokenComponent} from 'common/hooks/useTokenComponent/getTokenComponents.config';
import {useCache} from 'common/context/cacheContext';
import {useCallback, useEffect} from 'react';

export interface TokenComponent {
  tokenAddress: string;
  rate: string;
  components: TokenComponent[];
  unresolvedComponents: number;
}

const useTokenComponent = (
  tokenAddress: string,
  chainId = 1,
  protocolId = 'uniswap_v2',
): TokenComponent => {
  const client = useWeb3ApiClient();
  const [cachedTokenComponent, setCachedTokenComponent] = useCache<TokenComponent>(
    `getTokenComponents(${protocolId}, ${tokenAddress})`,
  );

  const updateTokenComponent = useCallback(async () => {
    console.log('updateTokenComponent', protocolId, tokenAddress);

    if (!cachedTokenComponent) {
      //console.log('No cache for', id, tokenAddress);
      const tokenComponent = await getTokenComponent(client, {tokenAddress, protocolId});

      if (tokenComponent) {
        setCachedTokenComponent(tokenComponent);
      }
    }
  }, [client, protocolId, chainId, tokenAddress]);

  useEffect(() => {
    updateTokenComponent();
  }, [protocolId, chainId, tokenAddress]);

  return cachedTokenComponent;
};

export default useTokenComponent;

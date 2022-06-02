import {useWeb3ApiClient} from '@web3api/react';
import {useCache} from 'common/context/cacheContext';
import {useCallback, useEffect} from 'react';
import {TokenToken} from 'utils/allNetworksDataFormatting';
import {getToken} from './getToken';

const useToken = (address: string, type = 'ERC20'): TokenToken => {
  const client = useWeb3ApiClient();
  const [cachedToken, setCachedToken] = useCache<TokenToken>(`getToken(${address}, ${type})`);

  const updateToken = useCallback(async () => {
    if (!cachedToken) {
      const token = await getToken(client, {address, type});

      if (token) {
        setCachedToken(token);
      }
    }
  }, [client, address, type]);

  useEffect(() => {
    updateToken();
  }, [address, type]);

  return cachedToken;
};

export default useToken;

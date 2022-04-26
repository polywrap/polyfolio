import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import {Networks, NetworksContextProps} from './Networks.types';
import useLocalStorage from 'common/hooks/useLocalStorage/useLocalStorage';

const NETWORKS_LS_KEY = 'polyfolio_network';
const NETWORKS_STATE_KEY = 'polyfolio_network_state';

const NetworksContext = createContext<NetworksContextProps>(null);
export const useNetworks = () => useContext(NetworksContext);

export default function NetworksContextProvider({children}) {
  const [persistedNetworks, setPersistedNetworks] = useLocalStorage<Networks>(
    NETWORKS_LS_KEY,
    null,
  );
  const themePersistState = atom({
    key: NETWORKS_STATE_KEY,
    default: persistedNetworks,
  });

  const [network, setNetworks] = useRecoilState(themePersistState);

  useEffect(() => {
    setPersistedNetworks(network ?? Networks.ethereum);
  }, [network, setPersistedNetworks]);

  return (
    <NetworksContext.Provider value={{network, setNetworks}}>{children}</NetworksContext.Provider>
  );
}

import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import SUPPORTED_NETWORKS from './Networks.config';
import {NetworksContextProps, INetwork} from './Networks.types';

const NETWORKS_STATE_KEY = 'polyfolio_network_state';

const NetworksContext = createContext<NetworksContextProps>(null);
export const useNetworks = () => useContext(NetworksContext);

export default function NetworksContextProvider({children}) {
  const networkPersistState = atom<INetwork[]>({
    key: NETWORKS_STATE_KEY,
    default: null,
  });

  const [networks, setNetworks] = useRecoilState(networkPersistState);

  useEffect(() => {
    if (!networks) {
      setNetworks(SUPPORTED_NETWORKS);
    }
  }, [networks, setNetworks]);

  return (
    <NetworksContext.Provider value={{networks, setNetworks}}>{children}</NetworksContext.Provider>
  );
}

import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import {networks} from './Networks.config';
import {NetworksContextProps} from './Networks.types';

const NETWORKS_STATE_KEY = 'polyfolio_network_state';

const NetworksContext = createContext<NetworksContextProps>(null);
export const useNetworks = () => useContext(NetworksContext);

export default function NetworksContextProvider({children}) {
  const networkPersistState = atom({
    key: NETWORKS_STATE_KEY,
    default: null,
  });

  const [network, setNetwork] = useRecoilState(networkPersistState);

  useEffect(() => {
    if (!network) {
      setNetwork(networks);
    }
  }, [network, setNetwork]);

  return (
    <NetworksContext.Provider value={{network, setNetwork}}>{children}</NetworksContext.Provider>
  );
}

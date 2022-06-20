import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import SUPPORTED_NETWORKS from './Networks.config';

const NETWORKS_STATE_KEY = 'polyfolio_network_state';

import {Network} from 'common/types';
import {Dispatch, SetStateAction} from 'react';

export interface NetworksContextProps {
  networks: Network[];
  setNetworks: Dispatch<SetStateAction<Network[]>>;
}

const NetworksContext = createContext<NetworksContextProps>({networks: null, setNetworks: null});
export const useNetworks = () => useContext(NetworksContext);

export default function NetworksContextProvider({children}) {
  const networkPersistState = atom<Network[]>({
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

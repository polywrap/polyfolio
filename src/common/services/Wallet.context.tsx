import React, {createContext, useContext} from 'react';
import {ethers} from 'ethers';
import {WalletContextProps, IWallet} from './Wallet.types';
import useAuth from 'common/hooks/useAuth/useAuth';
import {atom, useRecoilState} from 'recoil';

import useLocalStorage from 'common/hooks/useLocalStorage/useLocalStorage';

const WALLET_LS_STATE = 'polyfolio_wallet';
const WALLET_STATE_KEY = 'polyfolio_wallet_state';
const WalletContext = createContext<WalletContextProps>(null);
export const useWalletContext = () => useContext(WalletContext);

function WalletContextProvider({children}: {children: React.ReactNode}) {
  const {logIn, setUser} = useAuth();
  const [persistedWallet, setPersistedWallet] = useLocalStorage<IWallet>(WALLET_LS_STATE, null);
  const walletPersistState = atom<IWallet>({
    key: WALLET_STATE_KEY,
    default: persistedWallet,
  });
  const [wallet, setWallet] = useRecoilState(walletPersistState);

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window['ethereum']);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setWallet({provider, signer});
    setPersistedWallet({provider, signer});
    logIn(await signer.getAddress());
  };

  const check = async (address: string[]) => {
    if (address.length > 0) {
      console.log(wallet)
      await wallet?.provider.send('eth_requestAccounts', []);
      const signer = await wallet?.provider.getSigner();
      setWallet({...wallet, signer});
      setPersistedWallet({...wallet, signer});
      setUser(await signer?.getAddress());
    } else {
      setWallet(null);
      setPersistedWallet(null);
      setUser(null);
    }
  };

  return (
    <WalletContext.Provider value={{wallet, check, connect}}>{children}</WalletContext.Provider>
  );
}

export default WalletContextProvider;

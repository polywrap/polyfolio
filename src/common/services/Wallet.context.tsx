import React, {createContext, useContext, useState} from 'react';
//import MetaMaskOnboarding from '@metamask/onboarding';

import {WalletContextProps} from './Wallet.types';

import {ethers} from 'ethers';
import useAuth from 'common/hooks/useAuth/useAuth';

const WalletContext = createContext<WalletContextProps>(null);
export const useWalletContext = () => useContext(WalletContext);

function WalletContextProvider({children}: {children: React.ReactNode}) {
  const {logIn, setUser} = useAuth();
  const [wallet, setWallet] = useState<Record<string, unknown>>();

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window['ethereum']);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setWallet({provider, signer});
    logIn(await signer.getAddress());
  };

  const check = async (address: string[]) => {
    if (address.length > 0) {
      const provider = new ethers.providers.Web3Provider(window['ethereum']);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      setWallet({provider, signer});
      setUser(await signer.getAddress());
    } else {
      setWallet(null);
      setUser(null);
    }
  };

  return (
    <WalletContext.Provider value={{wallet, check, connect}}>{children}</WalletContext.Provider>
  );
}

export default WalletContextProvider;

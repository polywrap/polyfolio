import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
//import MetaMaskOnboarding from '@metamask/onboarding';

import { WalletContextProps } from './Wallet.types';

import { ethers } from 'ethers';
import useAuth from 'common/hooks/useAuth/useAuth';

const WalletContext = createContext<WalletContextProps>(null);
export const useWalletContext = () => useContext(WalletContext);

function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const { logIn, setUser } = useAuth();
  //const onboarding = useRef<MetaMaskOnboarding>(null);
  //const [accounts, setAccounts] = useState<string[]>([]);
  const [wallet, setWallet] = useState<Record<string, unknown>>();

  /*   useEffect(() => {
      if (!onboarding.current) {
        onboarding.current = new MetaMaskOnboarding(); 
      }
    }, []);
  
    useEffect(() => {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        if (accounts.length > 0) {
          onboarding.current.stopOnboarding();
        }
      }
    }, [accounts]);
  
    useEffect(() => {
      function handleNewAccounts(newAccounts) {
        setAccounts(newAccounts);
      }
  
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window["ethereum"]
          .request({ method: 'eth_requestAccounts' })
          .then(handleNewAccounts);
        window["ethereum"].on('accountsChanged', handleNewAccounts);
  
        return () => {
          window["ethereum"].off('accountsChanged', handleNewAccounts);
        };
      }
    }, []); */

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window["ethereum"]);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setWallet({ provider, signer });
    logIn(await signer.getAddress());
  }

  const check = async (address: string[]) => {
    if (address.length > 0) {
      const provider = new ethers.providers.Web3Provider(window["ethereum"]);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      setWallet({ provider, signer });
      setUser(await signer.getAddress());
    } else {
      setWallet(null);
      setUser(null);
    }
  }

  return (
    <WalletContext.Provider value={{ wallet, check, connect }}>
      {children}
    </WalletContext.Provider>
  );
}

export default WalletContextProvider;

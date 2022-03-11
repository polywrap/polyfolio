import React, {createContext, useContext, useState} from 'react';

import {WalletContextProps} from './Wallet.types';

const WalletContext = createContext<WalletContextProps>(null);
export const useWalletContext = () => useContext(WalletContext);

function WalletContextProvider({children}: {children: React.ReactNode}) {
  const [wallet, setWallet] = useState<Record<string, unknown>>();

  return <WalletContext.Provider value={{wallet, setWallet}}>{children}</WalletContext.Provider>;
}

export default WalletContextProvider;

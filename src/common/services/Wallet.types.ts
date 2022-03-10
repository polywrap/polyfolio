import {Dispatch, SetStateAction} from 'react';

interface WalletContextProps {
  wallet: Record<string, unknown>;
  setWallet: Dispatch<SetStateAction<Record<string, unknown>>>;
}

export { WalletContextProps };

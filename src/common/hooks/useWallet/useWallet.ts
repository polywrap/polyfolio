import RoutePath from 'common/modules/routing/routing.enums';
import {useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {atom, useRecoilState} from 'recoil';

import useLocalStorage from '../useLocalStorage/useLocalStorage';

const WALLET_LS_KEY = 'polyfolio_wallet';
const WALLET_STATE_KEY = 'polyfolio_wallet_state';

export default function useWallet() {
  const navigate = useNavigate();
  const [persistedWallet, setPersistedWallet] = useLocalStorage<Record<string, unknown>>(WALLET_LS_KEY, null);
  const walletPersistedState = atom({
    key: WALLET_STATE_KEY,
    default: persistedWallet,
  });

  const [wallet, setWallet] = useRecoilState(walletPersistedState);

  const connectWallet = useCallback((purse: Record<string, unknown>) => {
    setWallet(purse);
    setPersistedWallet(purse);
  }, [setWallet, setPersistedWallet]);

  const disconnectWallet = useCallback(() => {
    setWallet(null);
    setPersistedWallet(null);
    navigate(RoutePath.BaseRoute);
  }, [setWallet, setPersistedWallet, navigate]);

  useEffect(() => {
    setPersistedWallet(wallet);
  }, [setPersistedWallet, wallet]);

  return {wallet, connectWallet, disconnectWallet};
}

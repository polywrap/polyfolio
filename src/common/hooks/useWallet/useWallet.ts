import RoutePath from 'common/modules/routing/routing.enums';
import {useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {atom, useRecoilState} from 'recoil';

import useLocalStorage from '../useLocalStorage/useLocalStorage';

const WALLET_LS_KEY = 'polyfolio_wallet';
const WALLET_STATE_KEY = 'polyfolio_wallet_state';

export default function useWallet() {
  const navigate = useNavigate();
  const [persistedWallet, setPersistedWallet] = useLocalStorage<Record<string, unknown>>(WALLET_LS_KEY, {});
  const walletPersistedState = atom<Record<string, unknown>>({
    key: WALLET_STATE_KEY,
    default: persistedWallet,
    dangerouslyAllowMutability: true,
  });

  const [wallet, setWallet] = useRecoilState(walletPersistedState);

  const connectWallet = useCallback((pursue: Record<string, unknown>) => {
    setWallet(pursue);
    setPersistedWallet(pursue);
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

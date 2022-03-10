import {useWalletContext} from 'common/services/Wallet.context';

export default function useWallet() {
  const {wallet, setWallet} = useWalletContext();

  return {wallet, setWallet};
}

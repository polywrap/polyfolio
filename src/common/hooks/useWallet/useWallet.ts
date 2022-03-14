import {useWalletContext} from 'common/services/Wallet.context';

export default function useWallet() {
  const {wallet, check, connect} = useWalletContext();

  return {wallet, check, connect};
}

export interface IWallet {
  provider: import ('ethers').ethers.providers.Web3Provider;
  signer: import ('ethers').ethers.providers.JsonRpcSigner;
}

export interface WalletContextProps {
  wallet: IWallet;
  check: (address: string[]) => void;
  connect: () => void;
}

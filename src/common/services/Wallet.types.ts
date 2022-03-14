interface WalletContextProps {
  wallet: Record<string, unknown>;
  check: (address: string[]) => void;
  connect: () => void;
}

export { WalletContextProps };

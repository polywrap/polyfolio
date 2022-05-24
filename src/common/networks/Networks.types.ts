import {Dispatch, SetStateAction} from 'react';

export interface INetwork {
  name: string;
  jsonRPC: string;
  chainId: number;
  title: string;
  checked: boolean;
}

export interface NetworksContextProps {
  networks: INetwork[];
  setNetworks: Dispatch<SetStateAction<INetwork[]>>;
}

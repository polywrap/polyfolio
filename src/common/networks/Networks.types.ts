import {Dispatch, SetStateAction} from 'react';

export interface INetworks {
  name: string;
  jsonRPC: string;
  chainId: number;
  title: string;
  checked: boolean;
}

export interface NetworksContextProps {
  network: INetworks[];
  setNetwork: Dispatch<SetStateAction<INetworks[]>>;
}

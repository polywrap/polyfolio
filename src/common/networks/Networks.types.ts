import {Dispatch, SetStateAction} from 'react';

export enum Networks {
  ethereum = 'ethereum',
  polygon ='polygon',
}

export interface NetworksContextProps {
  network: Networks;
  setNetworks: Dispatch<SetStateAction<Networks>>;
}

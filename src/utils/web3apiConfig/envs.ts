import {Env} from '@web3api/client-js';
import ENS_URI from './ensUri';
import IPFS_URI from './ipfsUri';

const defaultEthereumConnection = {
  node: null,
  networkNameOrChainId: '1',
};

const mainEnv: Env = {
  uri: 'w3://ipfs/QmRicDYDFBHeyNhgyMqf19xt3T67WMALfxiAGj4M7FhGFf',
  common: {
    connection: defaultEthereumConnection,
  },
  query: {},
  mutation: {},
};

const covalentEnv: Env = {
  uri: 'w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth',
  query: {
    apiKey: 'ckey_910089969da7451cadf38655ede',
    chainId: 1,
    vsCurrency: 'USD',
    format: 'JSON',
  },
};
const tokenEnv: Env = {
  uri: 'w3://ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth',
  query: {
    connection: {
      networkNameOrChainId: 'MAINNET',
    },
  },
  common: {},
  mutation: {},
};

const mockEnv: Env = {
  uri: ENS_URI.MOCK,
  query: {
    //apiKey: 'ckey_910089969da7451cadf38655ede',
    //chainId: 1,
    vsCurrency: 'USD',
    //format: 'JSON',
  },
  common: {},
  mutation: {},
};

const usinswapAssetResolverEnv: Env = {
  uri: ENS_URI.ASSET.UNISWAP,
  common: {
    connection: defaultEthereumConnection,
  },
};
const uniswapAssetFallbackEnv: Env = {
  uri: IPFS_URI.ASSET.UNISWAP,
  common: {
    connection: defaultEthereumConnection,
  },
};

const ethereumTokenResolverEnv: Env = {
  uri: ENS_URI.TOKEN.ETHEREUM,
  query: {connection: defaultEthereumConnection},
};

const ENVS: Env<string>[] = [
  mainEnv,
  covalentEnv,
  tokenEnv,
  mockEnv,
  usinswapAssetResolverEnv,
  uniswapAssetFallbackEnv,
  ethereumTokenResolverEnv,
];

export default ENVS;

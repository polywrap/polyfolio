import iconsObj from 'assets/icons/iconsObj';

export const linkToAccountOnEtherscan = 'https://rinkeby.etherscan.io/address/';
export const startOfEthereumAddress = '0x';

export const networks = [
  {
    name: 'ethereum',
    jsonRPC: 'http://infura.io/...',
    chainId: 1,
    title: 'Ethereum',
    icon: iconsObj.ethereum
  },
  {
    name: 'polygon',
    jsonRPC: 'http://infura.io/...',
    chainId: 137,
    title: 'Polygon',
    icon: iconsObj.polygon
  }
];

export const chainIdToNetwork = {
  1: 'ethereum',
  137: 'polygon',
};

export const networkToChainId = {
  ethereum: 1,
  polygon: 137,
};

export const getCONFIG = (chainId = 1) => {
  return {
    envs: [
      {
        uri: "ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth",
        commons: {},
        query: {
          connection: {
            networkNameOrChainId: "MAINNET",
          },
        },
        mutation: {}
      },
      {
        uri: "w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth",
        query: {
          apiKey: "ckey_910089969da7451cadf38655ede",
          chainId,
        },
        common: {},
        mutation: {},
      }
    ],
    redirects: [
      {
        to: "w3://ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth",
        from: "w3://ens/ethereum.token-resolvers.defiwrapper.eth",
      }
    ]
  }
}

export const networks = [
  {
    name: 'ethereum',
    jsonRPC: 'http://infura.io/...',
    chainId: 1,
    title: 'Ethereum',
  },
  {
    name: 'polygon',
    jsonRPC: 'http://infura.io/...',
    chainId: 137,
    title: 'Polygon',
  }
];

export const chainIdToNetwork = {
  1: 'ethereum',
  137: 'polygon',
};

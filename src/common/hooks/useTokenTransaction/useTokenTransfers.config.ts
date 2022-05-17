export const uri = 'ens/rinkeby/mock.defiwrapper.eth';
export const query = `
query GetTokenTransfers($account: String!, $token: String!, $currency: String! $chainId: Int!) {
  getTokenTransfers(
    accountAddress: $account
    tokenAddress: $token
    vsCurrency: $currency # This will be moved to env of account-resolver
    chainId: $chainId
  )
}
`;
export const envsUri = {
  uri_1: 'ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth',
  uri_2: 'w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth',
};
export const apiKey = 'ckey_910089969da7451cadf38655ede';
export const redirects = [
  {
    to: "w3://ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth",
    from: "w3://ens/ethereum.token-resolvers.defiwrapper.eth",
  },
];

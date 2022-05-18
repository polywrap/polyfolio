export const uri = 'ens/rinkeby/mock.defiwrapper.eth';
export const query = `
query GetTransactions($account: String!, $currency: String!) {
  getTransactions(
    accountAddress: $account
    vsCurrency: $currency
  )
}
`;
export const envsUri = {
  uri_1: 'ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth',
  uri_2: 'w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth',
};
export const apiKey = 'ckey_910089969da7451cadf38655ede';

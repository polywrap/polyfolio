export const uri = 'ens/rinkeby/mock.defiwrapper.eth';
export const query = `
query GetTransactions($account: String!, $vsCurrency: String!) {
  getTransactions(
    accountAddress: $account
    vsCurrency: $vsCurrency
  )
}
`;

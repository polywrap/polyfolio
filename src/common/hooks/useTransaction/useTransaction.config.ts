export const uri = 'ens/rinkeby/mock.defiwrapper.eth';
export const query = `
query GetTransactions($account: String!, $currency: String!) {
  getTransactions(
    accountAddress: $account
    vsCurrency: $currency
  )
}
`;

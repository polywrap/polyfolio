export const uri = 'ens/rinkeby/mock.defiwrapper.eth';
export const query = `
query GetTokenTransfers($accountAddress: String!, $tokenAddress: String!, $vsCurrency: String!) {
  getTokenTransfers(
    accountAddress: $accountAddress
    tokenAddress: $tokenAddress
    vsCurrency: $vsCurrency
    options: null
  )
}
`;

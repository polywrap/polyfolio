export const uri = 'ens/rinkeby/mock.defiwrapper.eth';
export const query = `query {
  getAccountBalance(
    accountAddress: $accountAddress
    vsCurrencies: $vsCurrencies
    noTruncate: $noTruncate
    underlyingPrice: $underlyingPrice
  )
}`;

export const uri = 'ens/rinkeby/coingecko.defiwrapper.eth';
export const query = `
query TokenInfo($id: String!, $contract_address: String!){
  tokenInfo(id: $id, contract_address: $contract_address)
}
`;
export const envsUri = {
  uri_1: 'ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth',
  uri_2: 'w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth',
};
export const apiKey = 'ckey_910089969da7451cadf38655ede';

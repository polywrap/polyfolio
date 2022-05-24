import {Web3ApiClient} from '@web3api/client-js';

export const uri = 'ens/rinkeby/mock.defiwrapper.eth';

interface Variables {
  account: string;
  currency: string;
}

export const getTransactions = (
  client: Web3ApiClient,
  variables: Variables,
  options = {chainId: 1},
) => {
  const {account, currency} = variables;
console.log('getTransactions')

  return client.query({
    uri: uri,
    query: `query {
      getTransactions(
        accountAddress: $accountAddress
        vsCurrency: $vsCurrency
      )
  }`,
    variables: {accountAddress: '0x0aCE0B7Ec36E23FaFfe917d86F401B5E4CE6D51f', vsCurrency: currency},
    config: {
      envs: [
        {
          uri: 'w3://ens/rinkeby/covalent.account.resolvers.defiwrapper.eth',
          common: {
            apiKey: 'ckey_910089969da7451cadf38655ede',
            chainId: options.chainId,
            vsCurrency: currency,
            format: 'JSON',
          },
        },
      ],
    },
  });
};

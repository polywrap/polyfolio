import {PluginRegistration} from '@web3api/client-js';
import {ethereumPlugin} from '@web3api/ethereum-plugin-js';

const plugins: PluginRegistration<string>[] = [
  {
    uri: 'w3://ens/ethereum.web3api.eth',
    plugin: ethereumPlugin({
      networks: {
        mainnet: {
          provider: 'https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6',
        },
        rinkeby: {
          provider: 'https://rinkeby.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6',
        },
      },
    }),
  },
];

export default plugins;

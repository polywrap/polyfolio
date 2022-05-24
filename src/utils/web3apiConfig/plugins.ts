import {PluginRegistration} from '@web3api/client-js';
import {ethereumPlugin} from '@web3api/ethereum-plugin-js';

const plugins: PluginRegistration<string>[] = [
  {
    uri: 'ens/ethereum.web3api.eth',
    plugin: ethereumPlugin({
      networks: {
        mainnet: {
          provider: 'https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6',
        },
      },
    }),
  },
];

export default plugins;

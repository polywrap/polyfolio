import {Web3ApiClientConfig} from '@web3api/client-js';

import redirects from './redirects';
import plugins from './plugins';
import envs from './envs';

const config: Partial<Web3ApiClientConfig> = {
  plugins: plugins,
  envs: envs, // TODO  obsolete at the moment https://github.com/polywrap/monorepo/issues/828
  redirects: redirects,
};

export default config;

import {UriRedirect} from '@web3api/client-js';
import IPFS_URI from './ipfsUri';
import ENS_URI from './ensUri';

const REDIRECTS: UriRedirect[] = [
  {
    //ethereumTokenRedirect
    from: ENS_URI.TOKEN.ETHEREUM, // 'w3://ens/ethereum.token.resolvers.defiwrapper.eth',
    to: 'w3://ens/rinkeby/ethereum.token.resolvers.defiwrapper.eth',
  },
  {
    //const uniswapAssetResolverRedirect
    from: ENS_URI.ASSET.UNISWAP,
    to: IPFS_URI.ASSET.UNISWAP,
  },
  /*   {
    // mock.defiwrapper
    from: ENS_URI.MOCK,
    to: IPFS_URI.MOCK,
  }, */
];

export default REDIRECTS;

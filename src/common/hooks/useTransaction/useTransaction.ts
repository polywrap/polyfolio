//import {atom, useRecoilState} from 'recoil';
import _ from 'lodash';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';

//const BALANCE_STATE_KEY = 'polyfolio_balance';
//const ALL_ASSETS_STATE_KEY = 'polyfolio_allAssets';
//const ALL_ASSETS_SUM_STATE_KEY = 'polyfolio_allAssetsSum';

/* export const balanceState = atom({
  key: BALANCE_STATE_KEY,
  default: null,
});
export const allAssetsState = atom({
  key: ALL_ASSETS_STATE_KEY,
  default: null,
});
export const allAssetsSumState = atom({
  key: ALL_ASSETS_SUM_STATE_KEY,
  default: null,
}); */

export default function useTransactions() {
  const {user} = useAuth();

  //const [, setBalance] = useRecoilState(balanceState);
  //const [, setAllAssets] = useRecoilState(allAssetsState);
  //const [, setAllAssetsSum] = useRecoilState(allAssetsSumState);

  const {execute, loading, data} = useWeb3ApiQuery({
    uri: `ens/rinkeby/mock.defiwrapper.eth`,
    query: `query {
      getTransactions(
        accountAddress: $accountAddress
        vsCurrency: $vsCurrency
      )
    }`,
    config: {
      envs: [
        {
          uri: 'ens/rinkeby/mock.defiwrapper.eth',
          common: {
            connection: {
              node: null,
              networkNameOrChainId: 1,
            },
          },
          query: {},
          mutation: {},
        },
      ],
    },
  });

  const getTransactions = async () => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        accountAddress: user,
        vsCurrency: 'USDT',
      });
  
      if (response && !errors?.length) {
        const transactions = response;
        console.log(transactions);
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    }
  };

  return {getTransactions};
}

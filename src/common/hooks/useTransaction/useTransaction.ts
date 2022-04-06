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
        vsCurrencies: $vsCurrencies
      )
    }`,
    config: {
      envs: [
        {
          uri: "ens/ethereum.web3api.eth",
          query: {
            connection: {
              node: "https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6",
            },
          },
        },
      ],
    },
  });

  const getTransactions = async () => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        accountAddress: user,
        vsCurrencies: 'USDT',
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

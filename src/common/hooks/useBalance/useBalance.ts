import {atom, useRecoilState} from 'recoil';
import _ from 'lodash';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {getAssetsValueSum} from 'utils/helpers';

const BALANCE_STATE_KEY = 'polyfolio_balance';
const ALL_ASSETS_STATE_KEY = 'polyfolio_allAssets';
const ALL_ASSETS_SUM_STATE_KEY = 'polyfolio_allAssetsSum';

export const balanceState = atom({
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
});

export default function useBalance() {
  const {user} = useAuth();

  const [, setBalance] = useRecoilState(balanceState);
  const [, setAllAssets] = useRecoilState(allAssetsState);
  const [, setAllAssetsSum] = useRecoilState(allAssetsSumState);

  const {execute, loading, data} = useWeb3ApiQuery({
    uri: `ipfs/QmRYP5qwQd7AotVbtcx7KhN8HuHX9DCg8sS9LVE4kstpVw`,
    query: `query {
      getAccountBalance(
        accountAddress: $accountAddress
        vsCurrencies: $vsCurrencies
        noTruncate: $noTruncate
        underlyingPrice: $underlyingPrice
      )
    }`,
  });

  const getBalance = async () => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        accountAddress: user,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      });
  
      if (response && !errors?.length) {
        const balance = response?.getAccountBalance;
        const ejectedAssets = _.flatten(_.map(balance['protocols'], item => item.assets));
        const sum = getAssetsValueSum(ejectedAssets);
        console.log(balance);

        setBalance(balance);
        setAllAssets(ejectedAssets);
        setAllAssetsSum(sum);
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    }
  };

  return {getBalance};
}

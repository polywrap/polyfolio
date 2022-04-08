import {useCallback} from 'react';
import {atom, useRecoilState} from 'recoil';
import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {getAssetsValueSum, ejectAssetsFromProtocol} from 'utils/dataFormating';
// import {networks} from 'utils/constants';

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

  const getBalance = useCallback(async (/* id, name */) => {
    if (user && !loading && !data) {
      const {data: response, errors} = await execute({
        accountAddress: user,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      });
  
      if (response && !errors?.length) {
        const balance = response?.getAccountBalance;
        const ejectedAssets = ejectAssetsFromProtocol(balance['protocols']);
        const sum = getAssetsValueSum(ejectedAssets);
        console.log(balance);

        // setBalance({...balance as Record<string, unknown>, [name]: balance });
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
  }, [data, execute, loading, setAllAssets, setAllAssetsSum, setBalance, user]);

  /* const balanceInitialization = () => {
    networks.forEach((item) => getBalance(item.chainId, name))
  } */

  return {getBalance};
}

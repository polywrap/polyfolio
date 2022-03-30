import {useEffect, useCallback} from 'react';
import {atom, useRecoilState} from 'recoil';
import {v4 as uuidv4} from 'uuid';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from '../useAuth/useAuth';

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

export default function useData() {
  const {user} = useAuth();

  const [balance, setBalance] = useRecoilState(balanceState);
  const [allAssets, setAllAssets] = useRecoilState(allAssetsState);
  const [allAssetsSum, setAllAssetsSum] = useRecoilState(allAssetsSumState);

  const {execute, data, loading, errors} = useWeb3ApiQuery({
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

  const formatData = useCallback((data) => {
    const formatedData = data.protocols.map((item) => {
      const asset = formatAsset(item.assets);

      return {...item, assets: asset};
    });

    return {...data, protocols: formatedData};
  }, []);

  useEffect(() => {
    if (user && !loading && !data) {
      const getData = async () => {
        const {data: response, errors} = await execute({
          accountAddress: user,
          vsCurrencies: [],
          noTruncate: false,
          underlyingPrice: false,
        });

        if (response && !errors.length) {
          setBalance(formatData(response?.getAccountBalance));
        } else {
          // ADD ERROR HANDLER
          console.warn('ERRORS');
        }
      };

      getData();
    }
  }, [user, loading, data, errors, execute, setBalance, formatData]);

  const ejectAssetData = useCallback(() => {
    const assetArray = [];

    if (balance) {
      balance.protocols.map((item) => {
        for (const key in item.assets) {
          assetArray.push(item.assets[key]);
        }
      });
    }

    return assetArray;
  }, [balance]);

  const formatAsset = (assets) =>
    assets.map((item) => {
      return {...item.balance.token, id: uuidv4()};
    });

  useEffect(() => {
    if (balance) {
      setAllAssets(ejectAssetData());
    }
  }, [balance, ejectAssetData, setAllAssets]);

  const getAllAssetSum = useCallback(() => {
    let sum = 0;

    if (allAssets) {
      allAssets.map((item) =>
        item.values.map((val) => (sum += Number(val.value.split(',').join('')))),
      );

      setAllAssetsSum(sum);
    }
  }, [allAssets, setAllAssetsSum]);

  useEffect(() => {
    getAllAssetSum();
  }, [allAssets, getAllAssetSum]);

  return {balance, allAssets, allAssetsSum};
}

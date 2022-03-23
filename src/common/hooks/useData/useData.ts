import {useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { useWeb3ApiQuery } from '@web3api/react';
import useAuth from '../useAuth/useAuth';

const BALANCE_STATE_KEY = 'polyfolio_balance';
const ALL_ASSETS_STATE_KEY = 'polyfolio_allAssets';
const ALL_ASSETS_SUM_STATE_KEY = 'polyfolio_allAssetsSum';

export default function useData() {
  const {user} = useAuth();
  const balanceState = atom({
    key: BALANCE_STATE_KEY,
    default: null,
  });
  const allAssetsState = atom({
    key: ALL_ASSETS_STATE_KEY,
    default: null,
  });
  const allAssetsSumState = atom({
    key: ALL_ASSETS_SUM_STATE_KEY,
    default: null,
  });
  
  const [balance, setBalance] = useRecoilState(balanceState);
  const [allAssets, setAllAssets] = useRecoilState(allAssetsState);
  const [allAssetsSum, setAllAssetsSum] = useRecoilState(allAssetsSumState);

  const { execute } = useWeb3ApiQuery({
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

  const formatData = data => {
    const formatedData = data.protocols.map(item => {
      const asset = formatAsset(item.assets);

      return {...item, assets: asset};
    })

    return {...data, protocols: formatedData};
  }

  useEffect(() => {
    const getData = async () => {
      const data = await execute({ 
        accountAddress: user,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      })
      setBalance(formatData(data?.data?.getAccountBalance))
    }

    getData()
  }, [user])

  const ejectAssetData = () => {
    const assetArray = [];

    if (balance) {
      balance.protocols.map(item => {
        for (const key in item.assets) {
          assetArray.push(item.assets[key]);
        }
      });
    }

    return assetArray;
  }

  const formatAsset = assets => 
    assets.map(item => { return {...item.balance.token, id: uuidv4()} })

  useEffect(() => {
    if (balance) {
      setAllAssets(ejectAssetData());
    }
  }, [balance])

  const getAllAssetSum = () => {
    let sum = 0;

    if (allAssets) {
      allAssets.map(item => item.values.map(val => sum += Number(val.value.split(',').join(''))));
  
      setAllAssetsSum(sum);
    }
  }

  useEffect(() => {
    getAllAssetSum();
  }, [allAssets])


  return {balance, allAssets, allAssetsSum};
}

import {useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';

import { useWeb3ApiQuery } from '@web3api/react';
import useAuth from '../useAuth/useAuth';

const BALANCE_STATE_KEY = 'polyfolio_balance';

export default function useData() {
  const {user} = useAuth();
  const balancePersistState = atom({
    key: BALANCE_STATE_KEY,
    default: null,
  });
  
  const [balance, setBalance] = useRecoilState(balancePersistState);

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

  useEffect(() => {
    const getData = async () => {
      const data = await execute({ 
        accountAddress: user,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      })
      setBalance(data?.data?.getAccountBalance)
    }

    getData()
  }, [execute, setBalance, user])


  return {balance};
}

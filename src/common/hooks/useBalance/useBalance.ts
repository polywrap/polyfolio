import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {networks} from 'utils/constants';
import {ejectAssetsFromProtocol, getAssetsValueSum} from 'utils/dataFormating';
import allAssetsSumState from 'common/modules/atoms/allAssetsSum';
import balanceState from 'common/modules/atoms/balanceState';

export default function useBalance() {
  const {user} = useAuth();
  const client = useWeb3ApiClient();

  const [balance, setBalance] = useRecoilState(balanceState);
  const [allAssetsSum, setAllAssetsSum] = useRecoilState(allAssetsSumState);

  const balanceRequest = useCallback(async (name) => {
    const { data: response, errors } = await client.query({
      uri: `ipfs/QmRYP5qwQd7AotVbtcx7KhN8HuHX9DCg8sS9LVE4kstpVw`,
      query: `query {
        getAccountBalance(
          accountAddress: $accountAddress
          vsCurrencies: $vsCurrencies
          noTruncate: $noTruncate
          underlyingPrice: $underlyingPrice
        )
      }`,
      variables: {
        accountAddress: user,
        vsCurrencies: [],
        noTruncate: false,
        underlyingPrice: false,
      }
    });

    if (response && !errors?.length) {
      setAllAssetsSum({
        ...allAssetsSum,
        [name]: getAssetsValueSum(
          ejectAssetsFromProtocol(response?.getAccountBalance['protocols'])
        )
      })
      
      return response?.getAccountBalance
    }
    else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [allAssetsSum, client, setAllAssetsSum, user])

  const getBalance = useCallback(async () => {
    if (user && !balance) {
      let temporaryBalance = {}

      for (let i = 0; i < networks.length; i++) {
        const name = networks[i].name;
        temporaryBalance = {...temporaryBalance, [name]: await balanceRequest(name)};
      }

      setBalance(temporaryBalance);
    }
  }, [balance, balanceRequest, setBalance, user]);

  return {getBalance};
}

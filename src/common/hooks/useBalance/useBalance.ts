import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import useAuth from '../useAuth/useAuth';
import {networks} from 'utils/constants';
import balanceState from 'common/modules/atoms/balanceState';

export default function useBalance() {
  const {user} = useAuth();
  const client = useWeb3ApiClient();

  const [balance, setBalance] = useRecoilState(balanceState);

  const balanceRequest = useCallback(async (chainId) => {
    const { data: response, errors } = await client.query({
      uri: `ens/rinkeby/mock.defiwrapper.eth`,
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
      },
      config: {
        envs: [
          {
            uri: 'ens/rinkeby/mock.defiwrapper.eth',
            common: {
              connection: {
                node: null,
                networkNameOrChainId: chainId,
              },
            },
            query: {},
            mutation: {},
          },
        ],
      },
    });
    
    if (response && !errors?.length) {
      return response?.getAccountBalance
    }
    else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [client, user])

  const getBalance = useCallback(async () => {
    if (user && !balance) {
      let temporaryBalance = {}

      for (let i = 0; i < networks.length; i++) {
        const name = networks[i].name;
        const chainId = networks[i].chainId.toString();

        if (!balance || balance && !Object.keys(balance).includes(name)) {
          const response = await balanceRequest(chainId);
          temporaryBalance = {...temporaryBalance, [name]: response};
        }
      }

      setBalance(temporaryBalance);
    }
  }, [balance, balanceRequest, setBalance, user]);

  return {getBalance};
}

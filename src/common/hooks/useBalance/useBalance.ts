import {useCallback, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {useWeb3ApiClient} from '@web3api/react';
import balanceState from 'common/modules/atoms/balanceState';
import {insertChainIdToProtocol} from 'utils/dataFormatting';
import {getAccountBalance} from './getAccountBalance';
import {useNetworks} from 'common/networks/Networks.context';
//import {getCONFIG} from 'utils/constants';

export default function useBalance(address: string) {
  const client = useWeb3ApiClient();
  const {networks} = useNetworks();

  const [balance, setBalance] = useRecoilState(balanceState);

  const balanceRequest = useCallback(
    async (chainId?: number) => {
      const {data: response, errors} = await getAccountBalance(
        client,
        {accountAddress: address},
        {chainId},
      );

      if (response && !errors?.length) {
        return response?.getAccountBalance;
      } else {
        // ADD ERROR HANDLER
        console.log('ERRORS-------');
        console.log(errors);
        console.log('-----ERRORS');
      }
    },
    [address, client],
  );

  const getBalances = useCallback(async () => {
    let temporaryBalance = {};

    for (let i = 0; i < networks.length; i++) {
      console.log(networks[i]);

      if (networks[i].checked) {
        const name = networks[i].name;
        const chainId = networks[i].chainId;

        const response = await balanceRequest(chainId);
        temporaryBalance = {...temporaryBalance, [name]: response};
      }
    }

    insertChainIdToProtocol(temporaryBalance);

    setBalance(temporaryBalance);
  }, [address, balanceRequest]);

  useEffect(() => {
    if (address) {
      getBalances();
    }
  }, [address]);

  return balance;
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import moment from 'moment';
import iconsObj from 'assets/icons/iconsObj';
import {useLocation, useParams} from 'react-router-dom';
import transactionState from 'common/modules/atoms/transactionState';
import {useRecoilValue} from 'recoil';
import {ejectAssetsFromProtocol, getTransactionAddress} from 'utils/dataFormatting';
import {shortenedAddress, detectAssetOrProtocolPage} from 'utils/helpers';
import {ITransaction} from './AssetTransactions.type';
import balanceState from 'common/modules/atoms/balanceState';
import getFormattedData from 'utils/getFormattedData';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {useCallback, useEffect, useState} from 'react';
import {query, uri} from './getTokenTransfers.config';
import {useCurrency} from 'common/currency/Currency.context';
import {useWeb3ApiClient} from '@web3api/react';
import lodash from 'lodash';
import {formatDataAccordingToEvent} from 'utils/formatDataAccordingToEvent';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {networkToChainId} from 'utils/constants';
import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';
import ENS_URI from 'utils/web3apiConfig/ensUri';
import {getTokenComponent} from './getTokenComponents.config';
//import {asset} from 'tests/utilTests/dataFormatting/testConstants';

const useTransactions = () => {
  const client = useWeb3ApiClient();
  const {pathname} = useLocation();
  const {asset, protocol} = useParams();
  const pageType = detectAssetOrProtocolPage(pathname);
  const {currency} = useCurrency();
  const state = useRecoilValue(transactionState);
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance);
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const allProtocols = preparedData['allProtocols'];
  const assetItems = useAssets();
  const assetInfo = lodash.find(assetItems, {symbol: asset});
  const [data, setData] = useState<ITransaction[]>([]);
  let assetsFromProtocol;

  const getTokenTransfers = async (token: string, chainId: number, search: string) => {
    const account = search ?? user;
    //tokenInfo
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        accountAddress: account,
        tokenAddress: token,
        vsCurrency: currency,
      },
      config: {
        envs: [
          {
            uri: 'ipfs/QmdhnYXgxjavFDD9kUJE5BA3UeWGDeMhwwYQoJ1CM4ScTp',

            query: {
              connection: {
                networkNameOrChainId: 1,
              },
            },
          },
        ],
      },
    });
    console.log('RESP', response);

    if (response && !errors?.length) {
      const tokenTransfers = response?.getTokenTransfers;

      return tokenTransfers;
    } else {
      // ADD ERROR HANDLER
      console.log('getTokenTransfers ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  };

  useEffect(
    () => {
      console.log('USE EFFECT');

      const fetchTokenTransfers = async (assetsArray, chainId, search: string) => {
        const result = [];

        for await (const asset of assetsArray) {
          const res = await getTokenTransfers(asset?.token.token.address, chainId, search);

          if (res) result.push(res);
        }

        console.log('result', result);

        return result;
      };

      switch (pageType) {
        case 'protocol':
          console.log('useTransactions PROTOCOL');
          console.log('All protocols', allProtocols);

          let chainId = 1;
          lodash.forEach(allProtocols, (item) => {
            if (item['protocol']?.id === protocol) {
              console.log('IF', item['protocol']?.id, protocol);
              chainId = Number(item?.protocol.chainId);
              assetsFromProtocol = lodash.flatten(ejectAssetsFromProtocol(item));
            }
          });

          fetchTokenTransfers(assetsFromProtocol, chainId, search).then((data) => {
            setData(data);
          });
          break;

        case 'asset':
          console.log('case asset');

          if ('address' in assetInfo && 'protocol' in assetInfo) {
            const {address, protocol} = assetInfo;
            /*     getTokenComponent(client, {tokenAddress: address, protocolId: protocol}).then((res) => {
              console.log('getTokenComponent', res);
            }); */

/*             getTokenComponent(client, {
              tokenAddress: '0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5',
              protocolId: 'uniswap_v2',
            }).then((res) => {
              console.log('getTokenComponent EXAMPLE', res);
            }); */
          }

          break;

        default: {
          console.log('useTransactions DEFAULT');
          state?.transactions.forEach((transaction) => {
            const eventData = formatDataAccordingToEvent(
              transaction,
              user,
              preparedData['allAssets'],
            );

            if (eventData) {
              const {eventName, icon, tokenTicker, tokenAmount, tokenPrice} = eventData;

              if (eventName) {
                data.push({
                  id: transaction.offset,
                  type: eventName,
                  icon,
                  time: moment(transaction.timestamp).utc().format('hh:mm'),
                  token: [
                    {
                      id: tokenTicker,
                      icon: iconsObj.assetsToken,
                      token_amount: tokenAmount,
                      token_ticker: tokenTicker,
                      dollar_amount: tokenPrice,
                    },
                  ],
                  subjectOfAction: {
                    icon: iconsObj.profile,
                    address: shortenedAddress(
                      getTransactionAddress(eventName, transaction.from, transaction.to),
                      4,
                    ),
                  },
                });
              }
            }
          });
        }
      }
    },
    [
      /*   pageType,
    user,
    search,
    protocol,
    state?.transactions,
    preparedData,
    data, */
    ],
  );

  //console.log(data);

  return data;
};
export default useTransactions;

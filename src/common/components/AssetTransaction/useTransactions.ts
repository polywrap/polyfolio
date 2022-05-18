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
import {query, uri} from 'common/hooks/useAssetMetadata/useAssetMetadata.config';
import {useCurrency} from 'common/currency/Currency.context';
import {useWeb3ApiClient} from '@web3api/react';
import lodash from 'lodash';
import {formatDataAccordingToEvent} from 'utils/formatDataAccordingToEvent';
import {searchPersistState} from 'common/modules/atoms/searchState';
//import useAssets from '../AssetsTable/AssetsTableItem/AssetsTableItem.config';

const useTransactions = () => {
  const client = useWeb3ApiClient();
  const {pathname} = useLocation();
  const {/* asset, */ protocol} = useParams();
  const pageType = detectAssetOrProtocolPage(pathname);
  const {currency} = useCurrency();
  const state = useRecoilValue(transactionState);
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance);
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const allProtocols = preparedData['allProtocols'];
  //const assetItems = useAssets();
  //const assetInfo = lodash.find(assetItems, {symbol: asset})
  const [data, setData] = useState<ITransaction[]>([]);
  let assetsFromProtocol;

  const getTokenTransfers = useCallback(async (token: string, chainId: number, search: string) => {
    const account = search ?? user;
    const {data: response, errors} = await client.query({
      uri,
      query,
      variables: {
        account,
        token,
        currency,
        chainId,
      },
    })

    if (response && !errors?.length) {
      const tokenTransfers = response?.getTokenTransfers;

      return tokenTransfers;
    } else {
      // ADD ERROR HANDLER
      console.log('ERRORS-------');
      console.log(errors);
      console.log('-----ERRORS');
    }
  }, [client, currency, user])

  useEffect(() => {
    const fetchTokenTransfers = async (assetsArray, chainId, search: string) => {
      const result = [];
      console.log('assetsArray',assetsArray)

      for await (const asset of assetsArray) {
        const res = await getTokenTransfers(
          asset?.token.token.address,
          chainId,
          search
        );

        if (res) result.push(res);
      }

      return result;
    }

    switch (pageType) {
      case 'protocol':
        let chainId = 1;
        lodash.forEach(allProtocols, item => {
          if (item['protocol']?.id === protocol) {
            chainId = Number(item?.protocol.chainId);
            assetsFromProtocol = lodash.flatten(ejectAssetsFromProtocol(item));
          }
        })
        
        fetchTokenTransfers(assetsFromProtocol, chainId, search)
          .then((data) => {setData(data)});
      break;
      case 'asset':
  
       /*  if (!tokenTransfer)
          getTokenTransfer(
            assetInfo?.address,
            networkToChainId[assetInfo?.network],
            search
          )
        console.log(tokenTransfer) */
      break;
  
      default: {
        state?.transactions.forEach(transaction => {
          const eventData = formatDataAccordingToEvent(
            transaction,
            user,
            preparedData['allAssets']
          );
      
          if (eventData) {
            const {
              eventName,
              icon,
              tokenTicker,
              tokenAmount,
              tokenPrice,
            } = eventData;
        
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
                  }
                ],
                subjectOfAction: {
                  icon: iconsObj.profile,
                  address: shortenedAddress(getTransactionAddress(
                    eventName,
                    transaction.from,
                    transaction.to
                  ), 4),
                },
              })
            }
          }
        });
      }
    }
  }, [pageType, user, search, getTokenTransfers, protocol, state?.transactions, preparedData, data])

  
  console.log(data);

  return data;
}
export default useTransactions;


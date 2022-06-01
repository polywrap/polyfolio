/* eslint max-params: "off" */
import iconsObj from 'assets/icons/iconsObj';
import {TokenView, TransactionView} from 'common/components/AssetTransaction/TransactionItem';
import {Event, EventLog, Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {getAssetMetadata} from 'common/hooks/useAssetMetadata/useAssetMetadata';
import {
  findTokenName,
  getEventIcon,
  getEventType,
  getTokenAmount,
  getTokenPrice,
} from '../../../utils/dataFormatting';
import {Web3ApiClient} from '@web3api/client-js';
import {IAssetMetaData} from 'types/metaData.types';
import { EventTypes } from 'utils/constants';

const mapTypeToWay = (type: string) => {
  const types = {
    approval: 'Via',
    send: 'To',
    receive: 'From',
    exchange: 'Via',
  };

  return types[type];
};

export const toTransactionView = async (
  transaction: Transaction,
  user: string,
  assets,
  client: Web3ApiClient,
): Promise<TransactionView> => {
  //console.log('Transaction:', transaction);

  if (!transaction.logs.length) {
    // Event is Transfer if no logs
    return {
      icon: getEventIcon('Transfer'),
      subject: {address: transaction.to, icon: iconsObj.profile},
      time: new Date(transaction.timestamp).toDateString(),
      tokens: [],
      type: 'Transfer',
      way: mapTypeToWay('send'),
    } as TransactionView;
  } else {
    const userParticipatesIn = transaction.logs.find((log) =>
      log.event.params.some((p) => p.value === user),
    );

    if (!userParticipatesIn) {
      console.log('No user participation found in tx:', transaction);

      return undefined;
    }

    const result = await getTransactionViewByLog(
      userParticipatesIn,
      transaction,
      user,
      assets,
      client,
    );

    return result;
  }
};

// TODO Switch to enum
type SupportedEvent =
  | 'Approval'
  | 'Transfer'
  | 'Swap'
  | 'Withdrawal'
  | 'Sync'
  | 'StateSynced'
  | 'NewDepositBlock'
  | 'Deposit';

async function getTransactionViewByLog(
  log: EventLog,
  transaction: Transaction,
  user: string,
  assets: [],
  client: Web3ApiClient,
): Promise<TransactionView> {
  const {event, contractAddress} = log;

  const eventName: SupportedEvent = <SupportedEvent>event.name;
  const eventParams = event.params;

  const transactionView = {
    type: eventName,
    icon: getEventIcon(log.event.name),
    time: new Date(transaction.timestamp).toLocaleTimeString(),
    way: mapTypeToWay(eventName),
    tokens: [],
    subject: {
      address: '',
      icon: '',
    },
  };

  const tokenTicker: string = findTokenName(assets, contractAddress);
  let tokenPrice: number | string;
  let tokenAmount = '';
  let anySearchedValue;
  let token: TokenView;
  let tokenData: IAssetMetaData;

  switch (eventName) {
    case 'Transfer':
      console.log(eventParams)
      transactionView.type = getEventType(eventName, user, eventParams) as SupportedEvent;
      anySearchedValue = eventParams.find((item) => item.name === 'value');
      tokenData = (await getAssetMetadata(client, {
        id: 'ethereum',
        tokenAddress: contractAddress,
      })) as IAssetMetaData;
      tokenAmount = getTokenAmount(anySearchedValue?.value, assets, tokenTicker);
      tokenPrice = getTokenPrice(assets, tokenTicker);
      token = {
        icon: tokenData?.image.small, // need to ask, where to get
        symbol: tokenData?.symbol,
        price: tokenPrice as string,
        value: tokenAmount,
      };

      if (EventTypes.SEND) {
        anySearchedValue = eventParams.find((item) => item.name === 'to' && item.value !== user)
        transactionView.subject.address = anySearchedValue?.value;
      } else {
        anySearchedValue = eventParams.find((item) => item.name === 'from' && item.value !== user)
        transactionView.subject.address = anySearchedValue?.value;
      }

      transactionView.icon = tokenData?.image.small;
      transactionView.way = mapTypeToWay(transactionView.type);
      transactionView.subject.address = anySearchedValue?.value;
      transactionView.tokens.push(token);
      break;
    case 'Swap':
      transactionView.type = getEventType(eventName, user, eventParams) as SupportedEvent;
      tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
      break;

    case 'Approval':
      transactionView.type = getEventType(eventName, user, eventParams) as SupportedEvent;
      anySearchedValue = eventParams.find((item) => item.name === 'spender' && item.value !== user);
      tokenData = (await getAssetMetadata(client, {
        id: 'ethereum',
        tokenAddress: contractAddress,
      })) as IAssetMetaData;
      token = {
        icon: tokenData?.image.small,
        symbol: tokenData?.symbol,
      };
      transactionView.icon = tokenData?.image.small;
      transactionView.way = mapTypeToWay(transactionView.type);
      transactionView.subject.address = anySearchedValue?.value;
      transactionView.tokens.push(token);
      break;
    case 'Deposit':
    case 'Withdrawal':
    case 'Sync':
    case 'StateSynced':
    case 'NewDepositBlock':
    default:
      break;
  }

  return transactionView;
}

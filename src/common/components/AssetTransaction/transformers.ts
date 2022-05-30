/* eslint max-params: "off" */
import iconsObj from 'assets/icons/iconsObj';
import {TransactionView} from 'common/components/AssetTransaction/TransactionItem';
import {Event, EventLog, Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import _forEach from 'lodash/forEach';
import {
  findTokenName,
  getEventIcon,
  getEventType,
  getTokenAmount,
  getTokenPrice,
} from '../../../utils/dataFormatting';

const mapTypeToWay = (type: string) => {
  const types = {
    approval: 'Via',
    send: 'To',
    receive: 'From',
    exchange: 'Via',
  };

  return types[type];
};

export const toTransactionView = (
  transaction: Transaction,
  user: string,
  assets,
): TransactionView => {
  console.log('Transaction:', transaction);

  if (!transaction.logs.length) {
    // Event is Transfer if no logs
    return {
      icon: getEventIcon('Transfer'),
      subject: {address: transaction.to, icon: iconsObj.profile},
      time: new Date(transaction.timestamp).toLocaleTimeString(),
      tokens: [''],
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

    return getTransactionViewByLog(userParticipatesIn, transaction, user, assets);
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

function getTransactionViewByLog(
  log: EventLog,
  transaction: Transaction,
  user: string,
  assets: [],
): TransactionView {
  const {event} = log;

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

  const tokenTicker: string = findTokenName(assets, log.contractAddress);
  const tokenPrice: number | string = getTokenPrice(assets, tokenTicker);
  let tokenAmount = ''; // getTokenAmount(eventParams[1].value, assets, tokenTicker);

  switch (eventName) {
    case 'Transfer':
      transactionView.type = getEventType(eventName, user, eventParams) as SupportedEvent;
      tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
      break;
    case 'Swap':
      transactionView.type = getEventType(eventName, user, eventParams) as SupportedEvent;
      tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
      break;

    case 'Approval':
      tokenAmount = getTokenAmount(eventParams[2].value, assets, tokenTicker);
      break;
    case 'Deposit':
      tokenAmount = getTokenAmount(eventParams[1].value, assets, tokenTicker);
      break;
    case 'Withdrawal':
    case 'Sync':
    case 'StateSynced':
    case 'NewDepositBlock':
    default:
      break;
  }

  return transactionView;
}

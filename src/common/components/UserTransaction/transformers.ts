/* eslint max-params: "off" */
import iconsObj from 'assets/icons/iconsObj';
import {TransactionView} from 'common/components/UserTransaction/UserTransactionItem/UserTransactionItem';
import {Event, EventLog, Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {getAssetByAddress, getEventIcon} from '../../../utils/dataFormatting';
import {IBalance} from '../ProtocolsTable/ProtocolsItem/ProtocolTableItem.types';
import {
  ApprovalParams,
  EventProcessed,
  TransferParams,
  SupportedEvent,
} from './UserTransaction.types';

const ERC20_ADDRESS = '0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA';

/* ------------------ MAIN --------------------- */

export function toTransactionView(transaction: Transaction, user: string): TransactionView {
  if (!transaction.logs.length) {
    // Event is Transfer if no logs
    const transferType = getTransferType(transaction, user);

    return {
      icon: getEventIcon(transferType),
      subject: getTransferSubject(transaction, user),
      time: new Date(transaction.timestamp).toDateString(),
      tokens: [{id: 'ethereum', tokenAddress: ERC20_ADDRESS, tokenValue: transaction.value}],
      type: transferType,
      way: mapTypeToWay(transferType),
    } as TransactionView;
  } else {
    const userParticipatesIn = transaction.logs.find((log) =>
      log.event.params.some((p) => p.value === user),
    );

    if (!userParticipatesIn) {
      console.log('No user participation found in tx:', transaction);

      return undefined;
    }

    return getTransactionViewByLog(userParticipatesIn, transaction, user);
  }
}

function getTransactionViewByLog(
  log: EventLog,
  transaction: Transaction,
  user: string,
): TransactionView {
  const event = reduceEventParams(log.event);
  const eventType: SupportedEvent = SupportedEvent[log.event.name];

  const transactionViewDefaults = getTransactionViewDefaults(log, transaction);

  switch (eventType) {
    case SupportedEvent.Transfer: {
      const transferEvent = <EventProcessed<TransferParams>>event;

      const transferType = getTransferType(transferEvent, user);

      return {
        ...transactionViewDefaults,
        type: transferType,
        icon: getEventIcon(transferType),
        way: mapTypeToWay(transferType),
        subject: getTransferSubject(transferEvent, user),
        tokens: [
          {
            id: 'ethereum',
            tokenAddress: log.contractAddress,
            tokenValue: (transferType === 'Send' ? '-' : '').concat(transferEvent.params.value),
            /*
                  tokenPrice: asset && getTokenPrice(asset),
            tokenAmount: asset ? getTokenAmount(value, asset) : value, */
          },
        ],
      } as TransactionView;
    }

    case SupportedEvent.Approval: {
      const approvalEvent = <EventProcessed<ApprovalParams>>event;
      const {value} = approvalEvent.params;

      return {
        ...transactionViewDefaults,
        subject: getApprovalSubject(approvalEvent),
        tokens: [
          {
            id: 'ethereum',
            tokenAddress: log.contractAddress,
            /* tokenAmount: asset && getTokenAmount(value, asset),
            tokenPrice: asset && getTokenPrice(asset), */
          },
        ],
      };
      break;
    }
    default:
      break;
  }

  return transactionViewDefaults;
}

/* ---  UTIL --- */

function getTransactionViewDefaults(log: EventLog, transaction: Transaction): TransactionView {
  const eventType: SupportedEvent = SupportedEvent[log.event.name];

  return {
    type: eventType,
    icon: getEventIcon(log.event.name),
    time: new Date(transaction.timestamp).toLocaleTimeString(),
    way: mapTypeToWay(eventType),
    tokens: [{id: 'ethereum', tokenAddress: log.contractAddress}],
    subject: {
      value: '',
      icon: '',
    },
  };
}

export const mapTypeToWay = (type: string) => {
  const types = {
    Approval: 'Via',
    Send: 'To',
    Receive: 'From',
    Exchange: 'Via',
  };

  return types[type];
};

// TYPE------------------

const getTransferType = (txLike: Transaction | EventProcessed<TransferParams>, user: string) => {
  if ((<Transaction>txLike).blockHeight)
    return getTransferTypeTransaction(<Transaction>txLike, user);
  if ((<EventProcessed>txLike).params)
    return getTransferTypeEvent(<EventProcessed<TransferParams>>txLike, user);
};

const getTransferTypeTransaction = (transaction: Transaction, user: string) => {
  return transaction.to === user ? 'Receive' : 'Send';
};

const getTransferTypeEvent = (event: EventProcessed<TransferParams>, user: string) => {
  return event.params.from === user ? 'Send' : 'Receive';
};
// --------------------

// SUBJECTS----------------------
// 1.Transfer

const getTransferSubject = (txLike: Transaction | EventProcessed<TransferParams>, user: string) => {
  if ((<Transaction>txLike).blockHeight)
    return getTransferSubjectTransaction(<Transaction>txLike, user);
  if ((<EventProcessed>txLike).params)
    return getTransferSubjectEvent(<EventProcessed<TransferParams>>txLike, user);
};

const getTransferSubjectEvent = (event: EventProcessed<TransferParams>, user: string) => {
  const {from, to} = event.params;

  return {
    icon: iconsObj.profile,
    value: from === user ? to : from,
  };
};

const getTransferSubjectTransaction = (transaction: Transaction, user: string) => {
  return {
    icon: iconsObj.profile,
    value: transaction.from === user ? transaction.to : transaction.from,
  };
};

// 2. Approval
const getApprovalSubject = (approvalEvent: EventProcessed<ApprovalParams>) => {
  return {icon: iconsObj.profile, value: approvalEvent.params.owner};
};
//--------------------------

function reduceEventParams<TParams = unknown>(event: Event): EventProcessed<TParams> {
  const params = event.params.reduce(
    (prev, current) => ({...prev, [current.name]: current.value}),
    {},
  );

  return {...event, params: <TParams>params};
}

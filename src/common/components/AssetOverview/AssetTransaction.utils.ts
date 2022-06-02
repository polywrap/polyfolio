import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';

import {TokenTransfers, TransferTransfer} from './useAssetTranscations';
import {AssetTransactionView} from './AssetTransactionItem/AssetTransactionItem';

import {getEventIcon} from 'utils/dataFormatting';
import {TokenToken} from 'utils/allNetworksDataFormatting';
import {mapTypeToWay} from '../UserTransaction/transformers';
import iconsObj from 'assets/icons/iconsObj';

interface TransactionWithTransfer extends Transaction {
  transfers: TransferTransfer[];
  token: TokenToken;
}

export const reduceByDays = (
  tokenTransfers: TokenTransfers,
): Record<string, TransactionWithTransfer[]> => {
  const res = tokenTransfers.transfers.reduce((byDay, transfer) => {
    const dateKey = transfer.transaction.timestamp.split('T')[0];

    return {
      ...byDay,
      [dateKey]: [
        ...(byDay[dateKey] ? byDay[dateKey] : []),
        {...transfer.transaction, transfers: transfer.transfers, token: tokenTransfers.token},
      ],
    };
  }, {});

  return res;
};

export const getViewsByDate = (
  transactionsByDate: Record<string, TransactionWithTransfer[]>,
  account: string,
): Record<string, AssetTransactionView[]> => {
  const txViewsByDate = {};
  Object.keys(transactionsByDate).forEach((key) => {
    txViewsByDate[key] = transactionsByDate[key]
      .map((tx) => toAssetTransactionView(tx, account))
      .filter(Boolean);
  });

  return txViewsByDate;
};

export const toAssetTransactionView = (
  transaction: TransactionWithTransfer,
  account: string,
): AssetTransactionView => {
  if (transaction.transfers?.length > 1) {
    console.log('multiple transfers detected', transaction.transfers);
  }

  const transfer = transaction.transfers[0];
  const isReceiver = transfer.to === account;
  const type = isReceiver ? 'Receive' : 'Send';

  return {
    type: type,
    icon: getEventIcon(type),
    time: new Date(transaction.timestamp).toLocaleTimeString(),
    tokens: [{id: 'ethereum', tokenAddress: transaction.token.address, tokenValue: transfer.value}],
    way: mapTypeToWay(type),
    subject: {
      icon: iconsObj.profile,
      value: isReceiver ? transfer.from : transfer.to,
    },
  };
};

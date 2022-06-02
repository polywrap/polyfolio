import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {TransactionView} from './UserTransactionItem/UserTransactionItem';
import {toTransactionView} from './transformers';

export type DateString = string;

export const getViewsByDate = (
  transactionsByDateMap: Record<DateString, Transaction[]>,
  account: string,
): Record<string, TransactionView[]> => {
  const txViewsByDate = {};
  Object.keys(transactionsByDateMap).forEach((key) => {
    txViewsByDate[key] = transactionsByDateMap[key]
      .map((tx: Transaction) => toTransactionView(tx, account))
      .filter(Boolean);
  });

  return txViewsByDate;
};

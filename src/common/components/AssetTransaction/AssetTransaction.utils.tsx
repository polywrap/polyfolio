/* eslint-disable max-params */
import { Web3ApiClient } from '@web3api/client-js';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {TransactionView} from './TransactionItem';
import {toTransactionView} from './transformers';

export type DateString = string;

export const reduceByDays = (items: Transaction[]): Record<DateString, Transaction[]> => {
  return items.reduce((prev, currentTx) => {
    const key = currentTx.timestamp.split('T')[0];
    /*     const [year, month, day] = date.split('-');
    const key = `${year}-${month}-${day}`; */
    const currentKeyValue = prev[key] || [];
    prev[key] = [...currentKeyValue, currentTx];

    return prev;
  }, {});
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getViewsByDate = (
  transactionsByDateMap: Record<DateString, Transaction[]>,
  account: string,
  assets: [],
  client: Web3ApiClient,
): Record<string, TransactionView[]> => {
  const txViewsByDate = {};
  Object.keys(transactionsByDateMap).forEach(async (key) => {
    txViewsByDate[key] = await Promise.all(transactionsByDateMap[key]
    .map(async (tx: Transaction) => await toTransactionView(tx, account, assets, client)))
      // .filter(Boolean);
  });

  console.log('txViewsByDate', txViewsByDate)

  return txViewsByDate;
};

export const getTitleDate = (date: DateString) => {
  const [year, month, day] = date.split('-');

  return `${monthNames[Number(month) - 1]} ${day}, ${year}`;
};

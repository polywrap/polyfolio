import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {DateString} from '../UserTransaction/UserTransaction.utils';

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

export const getTitleDate = (date: DateString) => {
  const [year, month, day] = date.split('-');

  return `${monthNames[Number(month) - 1]} ${day}, ${year}`;
};

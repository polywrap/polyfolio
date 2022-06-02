import { getViewsByDate, reduceByDays } from '../AssetTransaction.utils';
import {transaction, account, allAssets, resultToTransactionView, date} from './testVariables';

test('Testing reduce by days', () => {
  const successfullTransactions = jest.fn(() => {
    return [
      transaction,
    ]
  })
  const result = reduceByDays(new successfullTransactions());

  const keyList = Object.keys(result);

  expect(keyList.length).toBe(1);
  expect(keyList[0]).toBe(date.split('T')[0]);
})

test('Testing get views by date', () => {
  const keydate = date.split('T')[0];
  const result = getViewsByDate({[keydate]: [transaction]}, account, allAssets as []);

  expect(result).toMatchObject({[keydate]: [resultToTransactionView]})
})

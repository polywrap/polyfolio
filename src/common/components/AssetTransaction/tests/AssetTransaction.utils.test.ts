import { Transaction } from "common/hooks/useTransaction/useTransactions.types";
import { getViewsByDate, reduceByDays } from "../AssetTransaction.utils"
import {
  transaction,
  account,
  allAssets,
} from './testVariables';

test('Reduce by date', () => {
  const inputData: Transaction[] = [transaction];
  const objectWithDateKeys = reduceByDays(inputData);

  expect(objectWithDateKeys).toEqual({
    'December 23, 2021': [inputData[0]]
  });
});

test('Get Views By Date', () => {
  const inputData = {
    'December 23, 2021': [
      transaction
    ]
  };

  const result = getViewsByDate(inputData, account, allAssets as []);
  
  expect(result).toMatchSnapshot({
    'December 23, 2021': []
  })
});

import React, {useCallback, useEffect, useState} from 'react';

import classNames from 'classnames';
import style from './AssetTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

import Table from '../TableBlock/Table/Table';
import TransactionItem, {TransactionView} from './TransactionItem';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';

import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {getTitleDate, getViewsByDate, reduceByDays} from './AssetTransaction.utils';
import Skeleton from '../Skeleton/Skeleton';
import {useWeb3ApiClient} from '@web3api/react';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const balance = useRecoilValue(balanceState);
  const client = useWeb3ApiClient();

  const {data, loading} = useTransactions({page, perPage: 100, config: {chainId: 1}});

  const getTransactionViews = (transactions: Transaction[]) => {
    if (!transactions) return {};

    const preparedData = getFormattedData(balance);

    const successfulTransactions = transactions.filter((tx) => tx.successful);

    const txByDate = reduceByDays(successfulTransactions);

    const result = getViewsByDate(
      txByDate,
      data.getTransactions.account,
      preparedData['allAssets'],
      client,
    );

    return result;
  };

  const viewsByDate = getTransactionViews(data?.getTransactions?.transactions); // extracted tx`s
  const viewsByDateList = Object.keys(viewsByDate);
  console.log('viewsByDate: ', viewsByDate);

  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader page={page} setPage={setPage} total={'?'} />
      {viewsByDate ? (
        viewsByDateList.map((key) => (
          <Table
            key={key}
            header={<div className={style.tableTitle}>{getTitleDate(key)}</div>}
            items={viewsByDate[key]}
            itemRender={(item: TransactionView, index) => (
              <TransactionItem key={index} item={item} />
            )}
          />
        ))
      ) : (
        <Skeleton height={'600px'} width={'100%'} />
      )}
    </div>
  );
}

export default AssetTransaction;

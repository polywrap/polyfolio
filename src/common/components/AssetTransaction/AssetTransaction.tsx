import React, {useState} from 'react';

import classNames from 'classnames';
import style from './AssetTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

import Table from '../TableBlock/Table/Table';
import TransactionItem from './AssetTransactionItem/AssetTransactionItem';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';

import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {getTitleDate, getViewsByDate, reduceByDays} from './AssetTransaction.utils';
import Skeleton from '../Skeleton/Skeleton';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const balance = useRecoilValue(balanceState);

  const {data, loading} = useTransactions({page, perPage: 100, config: {chainId: 1}});

  const getTransactionViews = (transactions: Transaction[]) => {
    if (!transactions) return {};

    const preparedData = getFormattedData(balance);

    const successfullTransactions = transactions.filter((tx) => tx.successful);

    const txByDate = reduceByDays(successfullTransactions);

    return getViewsByDate(txByDate, data.getTransactions.account, preparedData['allAssets']);
  };

  const viewsByDate = getTransactionViews(data?.getTransactions?.transactions);

  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader page={page} setPage={setPage} total={'?'} />
      {loading ? (
        <Skeleton height={'600px'} width={'100%'} />
      ) : (
        Object.keys(viewsByDate).map((key) => (
          <Table
            key={key}
            header={<div className={style.tableTitle}>{getTitleDate(key)}</div>}
            items={viewsByDate[key]}
            itemRender={(item, index) => <TransactionItem key={index} item={item} />}
          />
        ))
      )}
    </div>
  );
}

export default AssetTransaction;

import React, {useState} from 'react';

import classNames from 'classnames';
import style from './UserTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

import Table from '../TableBlock/Table/Table';
import TransactionItem from './UserTransactionItem/UserTransactionItem';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';

import {getViewsByDate} from './UserTransaction.utils';
import Skeleton from '../Skeleton/Skeleton';
import {getTitleDate, reduceByDays} from '../shared/utils';
import ButtonCsv from '../ButtonCsv/ButtonCsv';
import TablePagination from '../TablePagination/TablePagination';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);

  const chainId = 1; // TODO: switch to dynamic after pageination confirmation

  const {data, loading} = useTransactions({page, perPage: 10, config: {chainId: chainId}});

  const getTransactionViews = (transactions: Transaction[]) => {
    if (!transactions) return {};

    const successfullTransactions = transactions.filter((tx) => tx.successful);

    const txByDate = reduceByDays(successfullTransactions);

    return getViewsByDate(txByDate, data.getTransactions.account, chainId);
  };

  const viewsByDate = getTransactionViews(data?.getTransactions?.transactions);

  return (
    <div className={classNames(style[theme], style.transaction)}>
      <TableHeader page={page} setPage={setPage} total={page} />
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
      <div className={style.tableFooter}>
        <div className={style.container}>
          <ButtonCsv />
        </div>
        <div className={style.container}>
          <TablePagination page={page} total={page} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default AssetTransaction;

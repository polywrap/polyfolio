import React, {useState} from 'react';

import classNames from 'classnames';
import style from './AssetTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

import Table from '../TableBlock/Table/Table';
import TransactionItem from './TransactionItem';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {toTransactionView} from './transformers';
import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const balance = useRecoilValue(balanceState);

  const {data, loading} = useTransactions({page, perPage: 100, config: {chainId: 1}});

  //data?.getTransactions && console.log(data?.getTransactions?.transactions.length);

  const getValidTransactions = (transactions: Transaction[]) => {
    if (!transactions) return [];

    const preparedData = getFormattedData(balance);

    const filtered = transactions.filter((tx) => tx.successful);

    const formatted = filtered
      .map((tx) => toTransactionView(tx, data.getTransactions.account, preparedData['allAssets']))
      .filter(Boolean);

    return formatted;
  };

  const items = getValidTransactions(data?.getTransactions?.transactions);

  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader page={page} setPage={setPage} total={'?'} />
      <Table
        loading={loading}
        header={<div className={style.tableTitle}>December 1, 2021</div>}
        items={items}
        itemRender={(item, index) => <TransactionItem key={index} item={item} />}
      />
    </div>
  );
}

export default AssetTransaction;

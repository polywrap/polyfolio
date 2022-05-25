import React, {useState} from 'react';

import classNames from 'classnames';
import style from './AssetTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import TableBlock from '../TableBlock/TableBlock.legacy';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

import Table from '../TableBlock/Table/Table';
import TransactionItem from './TransactionItem';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';
import {formatDataAccordingToEvent} from 'utils/formatDataAccordingToEvent';
import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';

const filterTransactions = (
  transactions: Transaction[],
): [Transaction[], Transaction[], Transaction[]] => {
  const unsuccessfull: Transaction[] = [];
  const noLogs: Transaction[] = [];

  const filtered = transactions.filter((tx) => {
    if (!tx.successful) {
      unsuccessfull.push(tx);

      return false;
    }

    if (!tx.logs.length) {
      noLogs.push(tx);

      return false;
    }

    return true;
  });

  return [filtered, noLogs, unsuccessfull];
};

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const balance = useRecoilValue(balanceState);

  const {data, loading, errors} = useTransactions({page, perPage: 100, config: {chainId: 1}});

  data?.getTransactions && console.log(data?.getTransactions?.transactions.length);

  const getValidTransactions = (transactions: Transaction[]) => {
    if (!transactions) return [];
    /*     
    console.log('filtered', filtered.length, filtered);

    const participantIn = filtered.map((tx) =>
      tx.logs.find((log) =>
        log?.event.params.some((param) => param.value === data.getTransactions.account),
      ),
    );

    console.log('participantIn', participantIn); */

    const preparedData = getFormattedData(balance);

    const [filtered] = filterTransactions(transactions);

    const formatted = filtered.map((tx) =>
      formatDataAccordingToEvent(tx, data.getTransactions.account, preparedData['allAssets']),
    );
    console.log(formatted);
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

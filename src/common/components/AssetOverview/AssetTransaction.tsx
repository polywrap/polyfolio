import React, {useState, useCallback} from 'react';

import classNames from 'classnames';
import style from 'common/components/AssetTransaction/AssetTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

import Table from '../TableBlock/Table/Table';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';

import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import Skeleton from '../Skeleton/Skeleton';
import useAssetTranscations from './useAssetTranscations';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);

  const assetTransactions = useAssetTranscations({page, perPage: 10});
  assetTransactions.data?.getTokenTransfers &&
    console.log('assetTransactions', assetTransactions.data?.getTokenTransfers);
  //const viewsByDate = getTransactionViews(data?.getTransactions?.transactions);

  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader page={page} setPage={setPage} total={'?'} />
      {/* {loading ? (
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
      )} */}
    </div>
  );
}

export default AssetTransaction;

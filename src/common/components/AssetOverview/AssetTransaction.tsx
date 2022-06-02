import React, {useState} from 'react';

import classNames from 'classnames';
import style from 'common/components/UserTransaction/UserTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import Table from '../TableBlock/Table/Table';
import {useRecoilValue} from 'recoil';
import Skeleton from '../Skeleton/Skeleton';
import useAssetTranscations from './useAssetTranscations';
import TransactionItem from './AssetTransactionItem/AssetTransactionItem';
import {getTitleDate} from '../shared/utils';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {reduceByDays, getViewsByDate} from './AssetTransaction.utils';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);

  const {data, loading} = useAssetTranscations({page, perPage: 10});

  const getTransactionViews = () => {
    if (!data?.getTokenTransfers) return {};
    //console.log('transfers', data?.getTokenTransfers.transfers);

    const txByDate = reduceByDays(data.getTokenTransfers);

    return getViewsByDate(txByDate, search || user);
  };

  const viewsByDate = getTransactionViews();

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

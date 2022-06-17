import React, {useState} from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import Table from '../TableBlock/Table/Table';
import {useRecoilValue} from 'recoil';
import useAssetTranscations from './useAssetTranscations';
import TransactionItem from './AssetTransactionItem/AssetTransactionItem';
import {getTitleDate} from '../shared/utils';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {reduceByDays, getViewsByDate} from './AssetTransaction.utils';
import style from './AssetTransaction.module.scss';
import Dots from '../Loaders/Dots';

function AssetTransaction({tokenAddress}: {tokenAddress: string}) {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);

  const {data, loading} = useAssetTranscations({tokenAddress, page, perPage: 10});

  const getTransactionViews = () => {
    if (!data?.getTokenTransfers) return {};
    const txByDate = reduceByDays(data.getTokenTransfers);

    return getViewsByDate(txByDate, search || user);
  };

  const viewsByDate = getTransactionViews();

  return loading ? (
    <div style={{marginBottom: 48, marginTop: '100px'}}>
      <Dots />
    </div>
  ) : data?.getTokenTransfers?.transfers?.length ? (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader page={page} setPage={setPage} total={page} />
      {Object.keys(viewsByDate).map((key) => (
        <Table
          key={key}
          header={<div className={style.tableTitle}>{getTitleDate(key)}</div>}
          items={viewsByDate[key]}
          itemRender={(item, index) => <TransactionItem key={index} item={item} />}
        />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default AssetTransaction;

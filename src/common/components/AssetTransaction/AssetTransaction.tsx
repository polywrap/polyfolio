import React, {useState} from 'react';

import classNames from 'classnames';
import style from './AssetTransaction.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import TableHeader from '../TableHeader/TableHeader';
import TableBlock from '../TableBlock/TableBlock';
import useTransactions from 'common/hooks/useTransaction/useTransaction';

function AssetTransaction() {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);

  const {data, loading, errors} = useTransactions({page, config: {chainId: 1}});

  return (
    <div className={classNames(style[theme], style.transaction)}>
      <div className={style.title}>Transaction</div>
      <TableHeader page={page} setPage={setPage} total={'?'} />
      <TableBlock data={data?.getTransactions?.transactions} />
    </div>
  );
}

export default AssetTransaction;

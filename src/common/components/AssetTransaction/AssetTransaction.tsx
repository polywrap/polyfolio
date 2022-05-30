import React, {useState, useCallback} from "react";

import classNames from "classnames";
import style from './AssetTransaction.module.scss';
import useTheme from "common/hooks/useTheme/useTheme";
import TableHeader from "../TableHeader/TableHeader";
import TableBlock from "../TableBlock/TableBlock";
import ButtonCsv from 'common/components/ButtonCsv/ButtonCsv';
import useTransactions from "./useTransactions";
import TablePagination from "../TablePagination/TablePagination";

function AssetTransaction() {
  const total = 2;
  const theme = useTheme();
  const items = useTransactions();
  const [page, setPage] = useState<number>(1);

  const onPageChange = useCallback(
    (nextPage: number) => {
      setPage(nextPage);
    },
    [setPage],
  );
  
  return (
    <div className={classNames(style[theme], style.transaction)}>
      <TableHeader />
      <TableBlock data={items} />
      <div className={style.txTabFooter}>
        <div className={style.left}>
          <ButtonCsv />
        </div>
        <div className={style.right}>
          <TablePagination page={page} total={total} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  )
}

export default AssetTransaction

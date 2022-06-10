import React, {useState, useCallback} from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableHeader.module.scss';
import iconsObj from 'assets/icons/iconsObj';
import Input from 'common/components/Input/Input';
import TablePagination from '../TablePagination/TablePagination';
import NetworksPicker from '../NetworksPicker/NetworksPicker';

function TableHeader({page, setPage, total}) {
  const theme = useTheme();
  const [value, setValue] = useState<string>();

  const onPageChange = useCallback(
    (nextPage: number) => {
      setPage(nextPage);
    },
    [setPage],
  );

  return (
    <div className={classNames(style[theme], style.controlls)}>
      <div className={style.input_container}>
        <Input
          value={value}
          onChange={setValue}
          icon={iconsObj.search}
          wrapperClassName={classNames(style.input)}
          placeholder="Search by date or event type (ex: send)"
        />
      </div>
      <div className={style.right}>
        <div className={style.networks}>
          <NetworksPicker />
        </div>
        <div className={style.pagination}>
          <TablePagination page={page} total={total} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}

export default TableHeader;

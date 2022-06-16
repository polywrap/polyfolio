import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './Table.module.scss';
import Skeleton from 'common/components/Loaders/Skeleton';

interface TableProps<T> {
  header?: React.ReactNode;
  loading?: boolean;
  items: T[];
  itemRender: (item: T, index?: number) => React.ReactNode;
}

const Table = <TData,>({items, itemRender, header, loading = false}: TableProps<TData>) => {
  const theme = useTheme();

  return (
    <div className={classNames(style[theme], style.table)}>
      {header}
      {loading ? (
        <Skeleton width={'100%'} height={550} />
      ) : (
        items?.map((item, index) => itemRender(item, index))
      )}
    </div>
  );
};

export default Table;

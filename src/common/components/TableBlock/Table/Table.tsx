import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './Table.module.scss';
import TableRow from './TableRow/TableRow';

function Table({data}) {
  const theme = useTheme();

  return (
    <div className={classNames(style[theme], style.table)}>
      {data?.map((row) => (
        <TableRow
          key={row.id}
          type={row.type}
          icon={row.icon}
          time={row.time}
          tokens={row.token}
          subjectOfAction={row.subjectOfAction}
        />
      ))}
    </div>
  );
}

export default Table;

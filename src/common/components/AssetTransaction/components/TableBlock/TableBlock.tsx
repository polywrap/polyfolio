import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableBlock.module.scss';
import Table from './Table/Table';

function TableBlock() {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme], style.block)}>
      <div className={style.title}>December 1, 2021</div>
      <Table />
    </div>
  )
}

export default TableBlock

import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './Table.module.scss'

function Table() {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme], style.table)}>

    </div>
  )
}

export default Table

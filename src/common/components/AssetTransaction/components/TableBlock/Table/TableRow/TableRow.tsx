import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableRow.module.scss';

function TableRow() {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme])}>
      <div>
        <div className={style.imgContainer}></div>
        <div className={style.text}>
          <div className={style.strong}></div>
          <div className={style.common}></div>
        </div>
      </div>
      <div>
        <div className={style.imgContainer}></div>
        <div className={style.text}>
          <div className={style.strong}></div>
          <div className={style.common}></div>
        </div>
      </div>
      <div>
        <div>To</div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default TableRow

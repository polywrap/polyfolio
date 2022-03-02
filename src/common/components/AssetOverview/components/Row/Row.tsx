import React from 'react';

import style from './Row.module.scss';
import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import RowItem from '../RowItem/RowItem';

function Row ({ items }) {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme])}>
      { items.map(item => (
        <RowItem
         key={item.id}
         label={item.label}
         content={item.content}
         type={item.type}
        />
      ))}
    </div>
  )
}

export default Row

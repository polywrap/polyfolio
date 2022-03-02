import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './RowItem.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';

function RowItem({
  label,
  content,
  type,
}) {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme])}>
      {
        type === 'main' ? (
          <Icon src={iconsObj.profile} />
        ) : ''
      }
      <div className={style.text}>
        <div className={style.label}>{label}</div>
        <div className={classNames(style.content, type === 'profit' ? style.profit : '')}>
          {content}
        </div>
      </div>
    </div>
  )
}

export default RowItem

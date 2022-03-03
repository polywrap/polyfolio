import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableRow.module.scss';
import Icon from 'common/components/Icon/Icon';

function TableRow({
  type,
  icon,
  time,
  tokens,
  address,
}) {
  const theme = useTheme()
  
  const way = (type: string) => {
    const types = {
      'approval': 'Via',
      'send': 'To',
      'receive': 'From',
      'exchange': 'Via',
    };

    return types[type];
  }

  return (
    <div className={classNames(style[theme], style.row)}>
      <div className={classNames(style.rowUnit, style.flexUnit)}>
        <div className={style.imgContainer}>
          <Icon src={icon} className={classNames(style.icon)} />
        </div>
        <div className={style.text}>
          <div className={style.strong}>{type}</div>
          <div className={style.common}>{time}</div>
        </div>
      </div>
      <div className={classNames(style.rowUnit)}>
        {
          tokens.map(token => (
            <div key={token.id} className={style.flexUnit}>
              <div className={style.imgContainer}>
                <Icon src={token.icon} className={classNames(style.icon)} />
              </div>
              <div className={style.text}>
                <div className={style.strong}>{token.token_amount} {token.token_ticker}</div>
                <div className={style.common}>{token.dollar_amount}</div>
              </div>
            </div>
          ))
        }
      </div>
      <div className={classNames(style.rowUnit)}>
        <div>{way(type)}</div>
        <div>
          <div>{address}</div>
        </div>
      </div>
    </div>
  )
}

export default TableRow

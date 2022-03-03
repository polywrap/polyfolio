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

  return (
    <div className={classNames(style[theme])}>
      <div>
        <div className={style.imgContainer}>
          <Icon src={icon} />
        </div>
        <div className={style.text}>
          <div className={style.strong}>{type}</div>
          <div className={style.common}>{time}</div>
        </div>
      </div>
      <div>
        {
          tokens.map(token => (
            <div key={token.id}>
              <div className={style.imgContainer}>
                <Icon src={token.icon} />
              </div>
              <div className={style.text}>
                <div className={style.strong}>{token.token_amount} {token.token_ticker}</div>
                <div className={style.common}>{token.dollar_amount}</div>
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <div>To</div>
        <div>
          <div>{address}</div>
        </div>
      </div>
    </div>
  )
}

export default TableRow

import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableRow.module.scss';
import Icon from 'common/components/Icon/Icon';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';
import numberFormatter from 'utils/numberFormatter';
import { capitalize } from 'lodash';

function TableRow({
  type,
  icon,
  time,
  tokens,
  subjectOfAction,
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
      <div className={classNames(style.row_unit, style.flex_unit)}>
        <div className={style.img_container}>
          <Icon src={icon} className={classNames(style.icon)} />
        </div>
        <div className={style.text}>
          <div className={style.strong}>{capitalize(type)}</div>
          <div className={style.common}>{time}</div>
        </div>
      </div>
      <div className={classNames(style.token_info)}>
        {
          tokens.map(token => (
            <div key={token.id} className={classNames(style.flex_unit, style.token)}>
              <div className={style.img_container}>
                <Icon src={token.icon} className={classNames(style.icon)} />
              </div>
              <div className={style.text}>
                <div className={style.strong}>
                  {numberFormatter({ value: token.token_amount, size: 2 })} {token.token_ticker}
                </div>
                <div className={style.common}>
                  {
                    token.dollar_amount ? '$' + numberFormatter({ value: token.dollar_amount, size: 1 }) : ''
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <div className={style.label}>{way(type)}</div>
        <div>
          <HiglightedAddress icon={subjectOfAction.icon} address={subjectOfAction.address} />
        </div>
      </div>
    </div>
  )
}

export default TableRow

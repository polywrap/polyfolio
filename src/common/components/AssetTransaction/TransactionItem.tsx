import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './AssetItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';
import {capitalize} from 'lodash';

import iconsObj from 'assets/icons/iconsObj';
import numberFormatter from 'utils/numberFormatter';

export interface TokenView {
  symbol: string;
  value?: string;
  price?: string;
  icon: string;
}
export interface TransactionView {
  icon: string;
  type: string;
  time: string;
  tokens: TokenView[];
  //receiver: string;
  way: string;
  subject: {icon: string; address: string};
}
export interface TransactionProps {
  item: TransactionView;
  key?: string | number;
}

function TransactionItem({key, item}: TransactionProps) {
  const theme = useTheme();
  const {icon, type, time, tokens, way, subject} = item;

  return (
    <div key={key} className={classNames(style[theme], style.row)}>
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
        {tokens?.map((token) => (
          <div key={token.symbol} className={classNames(style.flex_unit, style.token)}>
            <div className={style.img_container}>
              <Icon src={token.icon} className={classNames(style.icon)} />
            </div>
            <div className={style.text}>
              <div className={style.strong}>
                {numberFormatter({value: token.value, size: 2})} {token.symbol}
              </div>
              <div className={style.common}>
                {token.price
                  ? '$' + numberFormatter({value: token.price, size: 1})
                  : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={style.label}>{way}</div>
        <div>
          <HiglightedAddress icon={subject?.icon} address={subject?.address} />
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;

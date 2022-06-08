import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './UserTransactionItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';
import {capitalize} from 'lodash';

import TokenView, {TokenViewProps} from 'common/components/shared/TokenView';

export interface TransactionView {
  icon: string;
  type: string;
  time: string;
  tokens: TokenViewProps[];
  way: string;
  subject: {icon: string; value: string};
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
        {tokens.map((token) => (
          <TokenView key={token.id} token={token} />
        ))}
      </div>
      <div>
        <div className={style.label}>{way}</div>
        <div>
          <HiglightedAddress icon={subject?.icon} address={subject?.value} />
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;

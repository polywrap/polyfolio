import React from 'react';
import classNames from 'classnames';
import Icon from 'common/components/Icon/Icon';
import TokenView, {TokenViewProps} from 'common/components/shared/TokenView';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from 'common/components/UserTransaction/UserTransactionItem/UserTransactionItem.module.scss';
import {capitalize} from 'lodash';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';

interface AssetTransactionItem {
  transfers: unknown[];
}

export interface AssetTransactionView {
  icon: string;
  type: string;
  time: string;
  tokens: TokenViewProps[];
  way: string;
  subject: {icon: string; value: string};
}

const AssetTransactionItem = ({item}: {item: AssetTransactionView}) => {
  const theme = useTheme();
  const {icon, type, time, tokens, way, subject} = item;

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
};

export default AssetTransactionItem;

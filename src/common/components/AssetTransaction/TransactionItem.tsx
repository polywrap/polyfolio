import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './AssetItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';
import {capitalize} from 'lodash';

import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import numberFormatter from 'utils/numberFormatter';

export interface TokenView {
  id: string;
  tokenAddress: string;
  tokenTicker?: string;
  tokenAmount?: string;
  tokenPrice?: string;
}
export interface TransactionView {
  icon: string;
  type: string;
  time: string;
  tokens: TokenView[];
  //receiver: string;
  way: string;
  subject: {icon: string; value: string};
}
export interface TransactionProps {
  item: TransactionView;
  key?: string | number;
}

const TokenView = ({token}: {token: TokenView}) => {
  const tokenMetadata = useAssetMetadata(token.id, 1, token.tokenAddress);

  return (
    <div key={token.id} className={classNames(style.flex_unit, style.token)}>
      <div className={style.img_container}>
        <Icon
          src={tokenMetadata?.image.small}
          className={classNames(style.icon)}
          alt={tokenMetadata?.id}
        />
      </div>
      <div className={style.text}>
        <div className={style.strong}>
          {token?.tokenAmount ? (
            <>
              {numberFormatter({value: token?.tokenAmount, size: 2})} {token?.tokenTicker}
            </>
          ) : (
            token.tokenAddress
          )}
        </div>
        <div className={style.common}>
          {token.tokenPrice ? '$' + numberFormatter({value: token.tokenPrice, size: 1}) : ''}
        </div>
      </div>
    </div>
  );
};

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

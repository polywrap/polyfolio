import React, {useEffect, useState} from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './UserTransactionItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';
import {capitalize} from 'lodash';

import TokenView, {TokenViewProps} from 'common/components/shared/TokenView';
import {getTokenComponent} from 'common/hooks/useTokenComponent/getTokenComponents.config';
import {useWeb3ApiClient} from '@web3api/react';
import {SupportedEvent} from '../UserTransaction.types';

export interface Subject {
  icon: string;
  value: string;
}
export interface TransactionView {
  icon: string;
  type: string;
  time: string;
  tokens: TokenViewProps[];
  way?: string;
  subject?: Subject;
}

export interface TransactionProps {
  item: TransactionView;
  key?: string | number;
}

const useTransactionItem = (item: TransactionView) => {
  const [tokens, setTokens] = useState<TokenViewProps[]>(item.tokens);
  const client = useWeb3ApiClient();

  useEffect(() => {
    if (item.type === SupportedEvent.Swap) {
      getTokenComponent(client, {tokenAddress: item.tokens[0].tokenAddress}).then((res) => {
        if (res?.components?.length) {
          const resTokens: TokenViewProps[] = res.components.map((component, index) => ({
            id: tokens[index]?.id,
            tokenAddress: component.tokenAddress,
            tokenValue: tokens[index].tokenValue,
          }));

          setTokens(resTokens);
        }
      });
    }
  }, [item]);

  return {...item, tokens};
};

function TransactionItem({key, item}: TransactionProps) {
  const theme = useTheme();
  const {icon, type, time, tokens} = useTransactionItem(item);

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
        <div className={style.label}>{item?.way}</div>
        <div>
          {item?.subject && (
            <HiglightedAddress icon={item?.subject?.icon} address={item?.subject?.value} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;

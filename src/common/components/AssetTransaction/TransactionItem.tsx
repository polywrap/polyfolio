import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './AssetItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import HiglightedAddress from 'common/components/HiglihtedAddress/HiglightedAddress';
import numberFormatter from 'utils/numberFormatter';
import {capitalize} from 'lodash';
import {Transaction} from 'common/hooks/useTransaction/useTransactions.types';

import iconsObj from 'assets/icons/iconsObj';

export interface TransactionProps {
  item: Transaction;
}

const toEvent = (transaction: Transaction) => {
  return {
    icon: '',
    type: '',
    time: new Date(transaction.timestamp).toLocaleTimeString(),
    tokens: [''],
    receiver: '',
    way: '',
    subject: {
      icon: iconsObj.profile,
      address: transaction.to,
    },
  };
};

function TransactionItem({item}: TransactionProps) {
  const theme = useTheme();
  const {icon, type, time, tokens, receiver, way, subject} = toEvent(item);

  console.log(item)

  const mapTypeToWay = (type: string) => {
    const types = {
      approval: 'Via',
      send: 'To',
      receive: 'From',
      exchange: 'Via',
    };

    return types[type];
  };

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
        {/*         {tokens?.map((token) => (
          <div key={token.id} className={classNames(style.flex_unit, style.token)}>
            <div className={style.img_container}>
              <Icon src={token.icon} className={classNames(style.icon)} />
            </div>
            <div className={style.text}>
              <div className={style.strong}>
                {numberFormatter({value: token.token_amount, size: 2})} {token.token_ticker}
              </div>
              <div className={style.common}>
                {token.dollar_amount
                  ? '$' + numberFormatter({value: token.dollar_amount, size: 1})
                  : ''}
              </div>
            </div>
          </div>
        ))} */}
      </div>
      <div>
        <div className={style.label}>{mapTypeToWay(type)}</div>
        <div>
          <HiglightedAddress icon={subject?.icon} address={subject?.address} />
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;

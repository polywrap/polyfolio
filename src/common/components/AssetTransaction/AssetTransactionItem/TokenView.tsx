import React from 'react';
import classNames from 'classnames';
import style from './AssetTransactionItem.module.scss';
import Icon from 'common/components/Icon/Icon';

import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import numberFormatter from 'utils/numberFormatter';
import {getTokenAmount} from 'utils/dataFormatting';
import useToken from 'common/hooks/useToken/useToken';
import {useCurrency} from 'common/currency/Currency.context';
import {CurrencySymbol} from 'common/currency/Currency.types';

export interface TokenViewProps {
  id: string;
  tokenAddress: string;
  tokenValue?: string;
}

const TokenView = ({token}: {token: TokenViewProps}) => {
  const tokenMetadata = useAssetMetadata(token.id, 1, token.tokenAddress);
  const tokenInfo = useToken(token?.tokenAddress);
  const {currency} = useCurrency();
  const tokenAmount: string = tokenInfo
    ? getTokenAmount(token?.tokenValue, tokenInfo.decimals)
    : '';

  const tokenPrice = tokenMetadata?.market_data.current_price.find(
    (p) => p.currency === currency.toLocaleLowerCase(),
  );

  const getTokenAmountInCurrency = () => {
    if (token.tokenValue && tokenPrice) {
      return Number(tokenAmount) * Number(tokenPrice.price);
    }
  };
  const tokenAmountInCurrency = getTokenAmountInCurrency();

  console.log(currency);

  const currStr = CurrencySymbol[currency] || '';

  return (
    <div key={token.id} className={classNames(style.flex_unit, style.token)}>
      {tokenMetadata ? (
        <>
          <div className={style.img_container}>
            <Icon
              src={tokenMetadata?.image.small}
              className={classNames(style.icon)}
              alt={tokenMetadata?.id}
            />
          </div>
          <div className={style.text}>
            <div className={style.strong}>
              {token?.tokenValue ? (
                <>
                  {tokenAmount.startsWith('-') ? '' : '+'}
                  {numberFormatter({value: tokenAmount, size: 2})} {tokenInfo?.symbol}
                </>
              ) : (
                tokenInfo?.symbol
              )}
            </div>
            <div className={style.common}>
              {tokenAmountInCurrency
                ? (tokenAmountInCurrency.toString().startsWith('-') ? '-' : '+') +
                  currStr +
                  numberFormatter({value: tokenAmountInCurrency, size: 1}).replace('-', '')
                : ''}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TokenView;

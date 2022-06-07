import {useEffect, useState} from 'react';

import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import numberFormatter from 'utils/numberFormatter';
import {getTokenAmount} from 'utils/dataFormatting';
import useToken from 'common/hooks/useToken/useToken';
import {useCurrency} from 'common/currency/Currency.context';
import {CurrencySymbol} from 'common/currency/Currency.types';
import {TokenViewProps} from '../shared/TokenView';

interface TokenInfo {
  symbol: string;
  icon: string;
  tokenChange?: string;
  currencyChange?: string;
}

interface TokenViewState {
  tokenInfo: TokenInfo;
  loading: boolean;
  error: '';
}

// tokenChange =
//{tokenAmount.startsWith('-') ? '' : '+'}
//{numberFormatter({value: tokenAmount, size: 2})} {tokenInfo?.symbol}

// currencyChange
//tokenAmountInCurrency ? (tokenAmountInCurrency.toString().startsWith('-') ? '-' : '+') + currStr + numberFormatter({value: tokenAmountInCurrency, size: 1}).replace('-', '') : ''

const getTokenAmountInCurrency = (amount: string, price: string, currencySymbol: string) => {
  let value = (Number(amount) * Number(price)).toString();

  const isNegative = value.startsWith('-');
  if (isNegative) value = value.replace('-', '');

  const operator = isNegative ? '-' : '+';

  return `${operator}${currencySymbol}${numberFormatter(value)}`;
};

const getTokenAmountString = (amount: string, tokenSymbol: string) => {
  let tokenAmountStr = amount;

  const isNegative = tokenAmountStr.startsWith('-');
  if (isNegative) tokenAmountStr = tokenAmountStr.replace('-', '');

  const operator = isNegative ? '-' : '+';

  return `${operator}${numberFormatter(tokenAmountStr)} ${tokenSymbol}`;
};

const useTokenView = (token: TokenViewProps) => {
  const {currency} = useCurrency();

  const [state, setState] = useState<TokenViewState>({
    tokenInfo: undefined,
    loading: true,
    error: '',
  });

  const tokenMetadata = useAssetMetadata(token.id, 1, token.tokenAddress);
  const tokenData = useToken(token?.tokenAddress);

  useEffect(() => {
    if (tokenMetadata && tokenData) {
      const currStr = CurrencySymbol[currency] || '';

      const tokenInfo: TokenInfo = {
        symbol: tokenData.symbol,
        icon: tokenMetadata.image.small,
      };

      // case when transaction involves token transfers
      if (token.tokenValue) {
        const tokenAmount = getTokenAmount(token?.tokenValue, tokenData.decimals);

        const tokenPrice = tokenMetadata?.market_data.current_price.find(
          (p) => p.currency === currency.toLocaleLowerCase(),
        );

        if (tokenAmount && tokenPrice) {
          tokenInfo.currencyChange = getTokenAmountInCurrency(
            tokenAmount,
            tokenPrice.price,
            currStr,
          );
          tokenInfo.tokenChange = getTokenAmountString(tokenAmount, tokenData.symbol);
        }
      }

      setState({
        loading: false,
        tokenInfo: tokenInfo,
        error: null,
      });
    }
  }, [tokenMetadata, tokenData]);

  return state;
};

export default useTokenView;

export const __getTokenAmountInCurrencyForTesting = (amount: string, price: string, currencySymbol: string) =>
  getTokenAmountInCurrency(amount, price, currencySymbol);

export const __getTokenAmountStringForTesting = (amount: string, currencySymbol: string) => 
  getTokenAmountString(amount, currencySymbol);

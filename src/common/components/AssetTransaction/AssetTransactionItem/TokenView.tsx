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
import useTokenView from '../useTokenView';

export interface TokenViewProps {
  id: string;
  tokenAddress: string;
  tokenValue?: string;
}

const TokenView = ({token}: {token: TokenViewProps}) => {
  const {tokenInfo, loading, error} = useTokenView(token);

  return (
    <div key={token.id} className={classNames(style.flex_unit, style.token)}>
      {tokenInfo ? (
        <>
          <div className={style.img_container}>
            <Icon src={tokenInfo.icon} className={classNames(style.icon)} alt={tokenInfo?.symbol} />
          </div>
          <div className={style.text}>
            <div className={style.strong}>
              {tokenInfo?.tokenChange ? tokenInfo.tokenChange : tokenInfo.symbol}
            </div>
            <div className={style.common}>{tokenInfo?.currencyChange}</div>
          </div>
        </>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default TokenView;

import React from 'react';
import classNames from 'classnames';
import style from './AssetTransactionItem.module.scss';
import Icon from 'common/components/Icon/Icon';

import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import numberFormatter from 'utils/numberFormatter';
import {getTokenAmount} from 'utils/dataFormatting';

export interface TokenViewProps {
  id: string;
  tokenAddress: string;
  tokenValue?: string;
}

const TokenView = ({token}: {token: TokenViewProps}) => {
  const tokenMetadata = useAssetMetadata(token.id, 1, token.tokenAddress);

  const DECIMALS = 6; // TODO Find decimals in tokenMetadata
  const tokenAmount: string = getTokenAmount(token?.tokenValue, DECIMALS) || '';

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
                  {numberFormatter({value: tokenAmount, size: 2})}{' '}
                  {tokenMetadata?.symbol.toUpperCase()}
                </>
              ) : (
                tokenMetadata?.name
              )}
            </div>
            <div className={style.common}>
              {/* {token.tokenPrice ? '$' + numberFormatter({value: token.tokenPrice, size: 1}) : ''} */}
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

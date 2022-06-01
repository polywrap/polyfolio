import React from 'react';
import classNames from 'classnames';
import style from './AssetTransactionItem.module.scss';
import Icon from 'common/components/Icon/Icon';

import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import numberFormatter from 'utils/numberFormatter';

export interface TokenViewProps {
  id: string;
  tokenAddress: string;
  tokenTicker?: string;
  tokenAmount?: string;
  tokenPrice?: string;
}

const TokenView = ({token}: {token: TokenViewProps}) => {
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
            tokenMetadata?.name
          )}
        </div>
        <div className={style.common}>
          {token.tokenPrice ? '$' + numberFormatter({value: token.tokenPrice, size: 1}) : ''}
        </div>
      </div>
    </div>
  );
};

export default TokenView;

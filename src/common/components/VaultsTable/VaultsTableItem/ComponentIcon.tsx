import React from 'react';
import Icon from 'common/components/Icon/Icon';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import styles from './VaultsTableItem.module.scss';
import iconsObj from 'assets/icons/iconsObj';
import Skeleton from 'common/components/Skeleton/Skeleton';

type Props = {
  tokenNetwork: string;
  chainId?: number;
  tokenAddress: string;
  isLast?: boolean;
};

export default function ComponentIcon({
  tokenNetwork,
  chainId = 1,
  tokenAddress,
  isLast = false,
}: Props) {
  const tokenMetadata = useAssetMetadata(tokenNetwork, chainId, tokenAddress);
  const icon = tokenMetadata?.image.small;

  return (
    <div className={styles.icon_wrap}>
      {icon ? (
        <Icon
          src={icon}
          className={styles.icon}
          style={{width: '40px', height: '40px', borderRadius: '50%'}}
        />
      ) : (
        <Skeleton width={40} height={40} style={{borderRadius: '50%'}} />
      )}
      {isLast ? <img src={iconsObj[tokenNetwork] as string} className={styles.networkIcon} /> : ''}
    </div>
  );
}

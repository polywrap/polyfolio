import React from 'react';
import Icon from 'common/components/Icon/Icon';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import styles from '../Vaults/VaultsTableItem/VaultsTableItem.module.scss';
import iconsObj from 'assets/icons/iconsObj';
import Skeleton from 'common/components/Skeleton/Skeleton';

type Props = {
  tokenNetwork: string;
  chainId?: number;
  tokenAddress: string;
  isLast?: boolean;
  size?: number;
};

export default function ComponentIcon({
  tokenNetwork,
  chainId = 1,
  tokenAddress,
  isLast = false,
  size = 40,
}: Props) {
  const tokenMetadata = useAssetMetadata(tokenNetwork, chainId, tokenAddress);
  const icon = tokenMetadata?.image.small;

  return (
    <div className={styles.icon_wrap}>
      {icon ? (
        <Icon
          src={icon}
          className={styles.icon}
          style={{width: `${size}px`, height: `${size}px`, borderRadius: '50%'}}
        />
      ) : (
        <Skeleton width={size} height={size} style={{borderRadius: '50%'}} />
      )}
      {isLast ? <img src={iconsObj[tokenNetwork] as string} className={styles.networkIcon} /> : ''}
    </div>
  );
}

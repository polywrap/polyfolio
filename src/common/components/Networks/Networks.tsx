import React, {useRef} from 'react';
import styles from './Networks.module.scss';
import numberFormatter from 'utils/numberFormatter';
import {useNavigate} from 'react-router-dom';
import useTheme from 'common/hooks/useTheme/useTheme';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import {networkToChainId} from 'utils/constants';
import RoutePath from 'common/modules/routing/routing.enums';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import {useRecoilValue} from 'recoil';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';
import {useNetworks} from 'common/networks/Networks.context';
import {Network} from 'common/types';
import iconsObj from 'assets/icons/iconsObj';
import {useBalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import MenuArrow from '../MenuArrow/MenuArrow';

function Networks() {
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const {networks} = useNetworks();

  return (
    networks.length > 0 && (
      <div ref={ref} className={styles[theme]}>
        <h3>{translation.Table.networks}</h3>
        <div className={styles.networks_container}>
          {networks?.map((network) => (
            <MenuItem network={network} key={network.name} />
          ))}
        </div>
      </div>
    )
  );
}

const MenuItem = ({network}: {network: Network}) => {
  const search = useRecoilValue(searchPersistState);
  const navigate = useNavigate();
  const user = useRecoilValue(userPersistState);
  const id = network.name.toLowerCase();
  const balanceData = useBalanceData([network]);

  const path =
    id && !search
      ? replaceRouteParameters(RoutePath.Network, {chainId: networkToChainId[id], user})
      : search
      ? replaceRouteParameters(RoutePath.Network, {chainId: networkToChainId[id], search})
      : RoutePath.NotFound;

  const assetSum = balanceData.assetSum;

  return (
    <div className={styles.menu_item} onClick={() => navigate(path)}>
      <div className={styles.title_container}>
        <Icon src={iconsObj[network.name]} className={styles.icon} />
        <div>
          <div className={styles.title}>{network.title}</div>

          <div className={styles.secondaryTitle}>${numberFormatter(assetSum)}</div>
        </div>
      </div>
      <div>
        <MenuArrow startPosition={'right'} />
      </div>
    </div>
  );
};

export default Networks;

import React, {useRef} from 'react';
import _map from 'lodash/map';

import styles from './Networks.module.scss';

import numberFormatter from 'utils/numberFormatter';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import {useNavigate} from 'react-router-dom';
import {NetworksItem} from './Networks.types';
import useNetwork from './Networks.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import Skeleton from '../Skeleton/Skeleton';
import {networkToChainId} from 'utils/constants';
import RoutePath from 'common/modules/routing/routing.enums';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import {useRecoilValue} from 'recoil';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';

function Networks() {
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const navigate = useNavigate();
  const user = useRecoilValue(userPersistState);
  const menuItems = useNetwork();

  const MenuItem = (menuItem: NetworksItem) => {
    const search = useRecoilValue(searchPersistState);
    const path =
      menuItem.id && !search
        ? replaceRouteParameters(menuItem.link, {chainId: networkToChainId[menuItem.id], user})
        : search
        ? replaceRouteParameters(menuItem.link, {chainId: networkToChainId[menuItem.id], search})
        : RoutePath.NotFound;

    return (
      <div className={styles.menu_item} onClick={() => navigate(path)}>
        <div className={styles.title_container}>
          <Icon src={menuItem.icon} className={styles.icon} />
          <div>
            <div className={styles.title}>{menuItem.title}</div>

            <div className={styles.secondaryTitle}>
              ${numberFormatter(menuItem.secondaryTitle)}
            </div>
          </div>
        </div>
        <div>
          <MenuArrow startPosition={'right'} />
        </div>
      </div>
    );
  };

  return menuItems.length > 0 ? (
    <div ref={ref} className={styles[theme]}>
      <h3>{translation.Table.networks}</h3>
      <div className={styles.networks_container}>
        {_map(menuItems, (menuItem) => (
          <MenuItem {...menuItem} key={menuItem.id} />
        ))}
      </div>
    </div>
  ) : (
    <Skeleton width={100} height={300} />
  );
}

export default Networks;

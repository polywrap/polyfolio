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
import useSearch from 'common/hooks/useSearch/useSearch';
import Skeleton from '../Skeleton/Skeleton';
import useAuth from 'common/hooks/useAuth/useAuth';
import { networkToChainId } from 'utils/constants';

function Networks() {
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const navigate = useNavigate();
  const {user} = useAuth();
  const menuItems = useNetwork();

  const MenuItem = (menuItem: NetworksItem) => {
    const {search} = useSearch();
    const path = menuItem.id && !search ? menuItem.link
      .replace(':user', `${user}`)
      .replace(':chainId', `${networkToChainId[menuItem.id]}`)
    : search ? menuItem.link
      .replace(':user', `${search}`)
      .replace(':chainId', `${networkToChainId[menuItem.id]}`)
    : '/404';

    return (
      <div className={styles.menu_item} onClick={() => navigate(path)}>
        <div className={styles.title_container}>
          <Icon src={menuItem.icon} className={styles.icon} />
          <div>
            <div className={styles.title}>{menuItem.title}</div>

            <div className={styles.secondaryTitle}>
              ${numberFormatter({value: menuItem.secondaryTitle, size: 2})}
            </div>
          </div>
        </div>
        <div>
          <MenuArrow filled startPosition={'up'} />
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
    <Skeleton width={1256} height={300} />
  );
}

export default Networks;

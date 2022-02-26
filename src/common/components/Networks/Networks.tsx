import React, {useRef} from 'react';
import _map from 'lodash/map';

import styles from './Networks.module.scss';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import {NetworksItem} from './Networks.types';
import {menuItems} from './Networks.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import Icon from 'common/components/Icon/Icon';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function Networks() {
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();

  const onClick = (item) => {
    console.log(item);
  };

  const MenuItem = (menuItem: NetworksItem) => {
    return (
      <div className={styles.menu_item} onClick={() => onClick(menuItem)}>
        <div className={styles.title_container}>
          <Icon src={menuItem.icon} className={styles.icon} />
          <div>
            <div className={styles.title}>{translation.Networks[menuItem.title]}</div>
            <div className={styles.secondaryTitle}>{[menuItem.secondaryTitle]}</div>
          </div>
        </div>
        <div style={{marginRight: '20px'}}>
          <MenuArrow filled startPosition={'up'} />
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className={styles[theme]}>
      <h3>Networks</h3>
      <div className={styles.networks_container}>
        {_map(menuItems, (menuItem) => (
          <MenuItem {...menuItem} key={menuItem.title} />
        ))}
      </div>
    </div>
  );
}

export default Networks;

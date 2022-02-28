import React, {useRef} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './AssetsTable.module.scss';

import {menuItems} from './AssetsTableItem/AssetsTableItem.config';
import AssetsTableItem from './AssetsTableItem/AssetsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';

function ProtocolsTable() {
  const ref = useRef(null);
  const theme = useTheme();

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable title="Assets" sum={9337337.0} />
      <div className={classNames(styles.table_container)}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>Assets</div>
          <div className={classNames(styles.title, styles.allocation)}>Allocation</div>
          <div className={classNames(styles.title, styles.price)}>Price</div>
          <div className={classNames(styles.title, styles.value)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            Value
          </div>
        </div>
        {_map(menuItems, (menuItem) => (
          <AssetsTableItem {...menuItem} key={menuItem.title} />
        ))}
      </div>
    </div>
  );
}

export default ProtocolsTable;

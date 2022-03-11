import React, {useRef} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './Vaults.module.scss';

import {menuItems} from './VaultsTableItem/VaultsTableItem.config';
import VaultsItem from './VaultsTableItem/VaultsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function ProtocolsTable() {
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation()

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable title={translation.Tables.vault} sum={9337337.0} />
      <div className={classNames(styles.table_container)}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.protocol)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Tables.protocol}
          </div>
          <div className={classNames(styles.title, styles.allocation)}>{translation.Tables.allocation}</div>
          <div className={classNames(styles.title, styles.value)}>{translation.Tables.value}</div>
          <div className={classNames(styles.title, styles.claimable)}>{translation.Tables.claimable}</div>
        </div>
        {_map(menuItems, (menuItem) => (
          <VaultsItem {...menuItem} key={menuItem.title} />
        ))}
      </div>
    </div>
  );
}

export default ProtocolsTable;

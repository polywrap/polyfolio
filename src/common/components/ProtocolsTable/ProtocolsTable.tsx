import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './Protocols.module.scss';

import {menuItems} from './ProtocolsItem/ProtocolTableItem.config';
import ProtocolTableItem from './ProtocolsItem/ProtocolTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';

function ProtocolsTable() {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        setIsOpen={() => setIsOpen(!isOpen)}
        title="Protocols"
        isOpen={isOpen}
        sum={3837337.0}
      />
      <div className={classNames(styles.table_container, {[styles.none]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.protocol)}>Protocol</div>
          <div className={classNames(styles.title, styles.value)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            Value
          </div>
          <div className={classNames(styles.title, styles.claimable)}>Claimable</div>
        </div>
        {_map(menuItems, (menuItem) => (
          <ProtocolTableItem {...menuItem} key={menuItem.title} />
        ))}
      </div>
    </div>
  );
}

export default ProtocolsTable;

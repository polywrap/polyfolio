import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './Protocols.module.scss';

import GetProtocols from './ProtocolsItem/ProtocolTableItem.config';
import ProtocolTableItem from './ProtocolsItem/ProtocolTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function ProtocolsTable() {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const menuItems = GetProtocols();

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        title={translation.Table.protocols}
        setIsOpen={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        sum={3837337.0}
      />
      <div className={classNames(styles.table_container, {[styles.none]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.protocol)}>
            {translation.Table.protocols}
          </div>
          <div className={classNames(styles.title, styles.value)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Table.value}
          </div>
          <div className={classNames(styles.title, styles.claimable)}>
            {translation.Table.claimable}
          </div>
        </div>
        {_map(menuItems, (menuItem) => (
          <ProtocolTableItem {...menuItem} key={menuItem.title} />
        ))}
      </div>
    </div>
  );
}

export default ProtocolsTable;

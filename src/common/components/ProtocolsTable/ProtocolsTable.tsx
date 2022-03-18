import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './Protocols.module.scss';

import {menuItems} from './ProtocolsItem/ProtocolTableItem.config';
import ProtocolTableItem from './ProtocolsItem/ProtocolTableItem';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import {Filters} from 'common/hooks/useFiltersTables/Filters.types';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import {menuFields} from './FilterFieldsProtokols.config';

function ProtocolsTable() {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();

  const onChange = (name, value) => {
    setFilter({...filters, protocols: {...filter.protocols, [name]: value?.checked}});
  };

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        onSaveFilter={() => {
          setFilters(filter);
          setIsOpen(!isOpen);
        }}
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        title={translation.Table.protocols}
        setIsOpen={() => setIsOpen(!isOpen)}
        filter={filter.protocols}
        menuFields={menuFields}
        onChange={onChange}
        isOpen={isOpen}
        sum={3837337.0}
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.protocol)}>
            {translation.Table.protocols}
          </div>
          <div
            className={classNames(styles.title, styles.value, {
              [styles.hidden]: filters.protocols.value,
            })}
          >
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Table.value}
          </div>
          <div
            className={classNames(styles.title, styles.claimable, {
              [styles.hidden]: filters.protocols.claimable,
            })}
          >
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

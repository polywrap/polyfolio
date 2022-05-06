import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './Vaults.module.scss';

import GetVaults from './VaultsTableItem/VaultsTableItem.config';
import VaultsItem from './VaultsTableItem/VaultsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import {Filters} from 'common/hooks/useFiltersTables/Filters.types';
import {menuFields} from './FilterFieldsVaults.config';
import {useLocation} from 'react-router-dom';
import {getStringFromPath} from 'utils/helpers';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';

function VaultsTable() {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 1);
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const menuItems = GetVaults();
  const formatData = useGetData(page);
  const preparedData = formatData();

  const onChange = (name, value) => {
    setFilter({...filter, vaults: {...filter.vaults, [name]: !value?.checked}});
  };

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        onSaveFilter={() => {
          setFilters({...filters, ...filter});
          setIsOpen(!isOpen);
        }}
        setIsOpen={() => setIsOpen(!isOpen)}
        title={translation.Tables.vault}
        filter={filter.vaults}
        menuFields={menuFields}
        onChange={onChange}
        isOpen={isOpen}
        sum={preparedData['allAssetsSum']}
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Tables.protocol}
          </div>
          <div
            className={classNames(styles.title, styles.allocation, {
              [styles.hidden]: filters.vaults.allocation,
            })}
          >
            {translation.Tables.allocation}
          </div>
          <div
            className={classNames(styles.title, styles.price, {
              [styles.hidden]: filters.vaults.value,
            })}
          >
            {translation.Table.value}
          </div>
          <div
            className={classNames(styles.title, styles.value, {
              [styles.hidden]: filters.vaults.claimable,
            })}
          >
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Tables.claimable}
          </div>
        </div>
        {_map(menuItems, (menuItem) => {
          return <VaultsItem {...menuItem} key={menuItem.id} />;
        })}
      </div>
    </div>
  );
}

export default VaultsTable;

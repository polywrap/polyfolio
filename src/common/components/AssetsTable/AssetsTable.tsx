import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './AssetsTable.module.scss';

import useAssets from './AssetsTableItem/AssetsTableItem.config';
import {menuFields} from './FilterFieldsAssets.config';
import AssetsTableItem from './AssetsTableItem/AssetsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import {Filters} from 'common/hooks/useFiltersTables/Filters.types';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import { useLocation } from 'react-router-dom';
import { getStringFromPath } from 'utils/helpers';

function AssetsTable() {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 2);
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const assets = useAssets();
  const formatedData = useGetData(page);
  const preparedData = formatedData();

  const onChange = (name, value) => {
    setFilter({...filters, assets: {...filter.assets, [name]: !value?.checked}});
  };
  
  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        onSaveFilter={() => {
          setFilters(filter);
          setIsOpen(!isOpen);
        }}
        setIsOpen={() => setIsOpen(!isOpen)}
        title={translation.Table.assets}
        menuFields={menuFields}
        filter={filter.assets}
        onChange={onChange}
        isOpen={isOpen}
        sum={preparedData['allAssetsSum']}
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>{translation.Table.assets}</div>
          <div
            className={classNames(styles.title, styles.allocation, {
              [styles.hidden]: filters.assets.allocation,
            })}
          >
            {translation.Table.allocation}
          </div>
          <div
            className={classNames(styles.title, styles.price, {
              [styles.hidden]: filters.assets.price,
            })}
          >
            {translation.Table.price}
          </div>
          <div
            className={classNames(styles.title, styles.value, {
              [styles.hidden]: filters.assets.value,
            })}
          >
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            Value
          </div>
        </div>
        {_map(assets, (asset) => (
          <AssetsTableItem {...asset} key={asset.id} />
        ))}
      </div>
    </div>
  );
}

export default AssetsTable;

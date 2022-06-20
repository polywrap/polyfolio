import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import styles from './Vaults.module.scss';

import VaultsItem from './VaultsTableItem/VaultsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import {Filters} from 'common/hooks/useFiltersTables/Filters.types';
import {menuFields} from './FilterFieldsVaults.config';
import {DataRangeSelectorItem} from '../../DateRangeSelector/DataRangeSelector.types';

import AssetBreakdown from 'common/components/ProtocolPage/AssetBreakDown/AssetBreakDown';
import {getAssetValueStr} from '../shared/utils';
import {ProtocolData} from '../shared/types';

interface Props {
  protocolData: ProtocolData;
}

function VaultsTable({protocolData}: Props) {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const [dataRange, setDataRange] = useState<DataRangeSelectorItem>({});
  const [dataRangeIsOpen, setDataRangeIsOpen] = useState(true);

  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleOpenModal = (menuItem) => {
    setSelectedAsset(menuItem);
  };

  const handleOnCloseModal = () => {
    setSelectedAsset(undefined);
  };

  const changeDataRange = (e) => {
    setDataRange(e);
    setDataRangeIsOpen(!dataRangeIsOpen);
  };

  const onChange = (name, value) => {
    setFilter({...filter, vaults: {...filter.vaults, [name]: !value?.checked}});
  };

  return !protocolData ? (
    <div />
  ) : (
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
        sum={getAssetValueStr(protocolData.assetValue)}
        changeDataRange={changeDataRange}
        dataRange={dataRange}
        dataRangeIsOpen={dataRangeIsOpen}
        setDataRangeIsOpen={setDataRangeIsOpen}
        dataRangeSelectorExist
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Tables.asset}
          </div>
          <div
            className={classNames(styles.title, styles.price, {
              [styles.hidden]: filters.vaults.balance,
            })}
          >
            {translation.Table.balance}
          </div>
          <div
            className={classNames(styles.title, styles.value, {
              [styles.hidden]: filters.vaults.value,
            })}
          >
            {translation.Tables.value}
          </div>
        </div>
        {protocolData.assets.map((asset) => (
          <VaultsItem key={asset.title} asset={asset} onClick={() => handleOpenModal(asset)} />
        ))}
      </div>
      {selectedAsset && <AssetBreakdown asset={selectedAsset} onCloseModal={handleOnCloseModal} />}
    </div>
  );
}

export default VaultsTable;

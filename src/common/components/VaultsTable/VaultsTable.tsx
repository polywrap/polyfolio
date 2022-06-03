import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './Vaults.module.scss';

import VaultsItem from './VaultsTableItem/VaultsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import {Filters} from 'common/hooks/useFiltersTables/Filters.types';
import {menuFields} from './FilterFieldsVaults.config';
import {useParams} from 'react-router-dom';
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';
import balanceState from 'common/modules/atoms/balanceState';
import {useRecoilValue} from 'recoil';

import AssetBreakdown from 'common/components/AssetBreakDown/AssetBreakDown';
import {AccountBalance} from 'utils/allNetworksDataFormatting';
import {chainIdToNetwork} from 'utils/constants';
import {toProtocolData} from './transformers';
import {getAssetValueStr} from './utils';
import {ProtocolData} from './types';

const getProtocol = (
  balance: Record<string, AccountBalance>,
  chainId: string,
  protocolId: string,
) => {
  if (balance) {
    const network = chainIdToNetwork[chainId];
    const protocolsAtChain = balance[network];

    const protocolProtocol = protocolsAtChain.protocols.find(
      ({protocol}) => protocol.id === protocolId,
    );

    return protocolProtocol;
  }
};

function VaultsTable() {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const [dataRange, setDataRange] = useState<DataRangeSelectorItem>({});
  const [dataRangeIsOpen, setDataRangeIsOpen] = useState(true);

  const balance = useRecoilValue(balanceState);

  const {chainId, protocol: protocolId} = useParams();

  const [protocolData, setProtocolData] = useState<ProtocolData>(undefined);

  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    if (balance) {
      const protocol = getProtocol(balance, chainId, protocolId);

      if (protocol) {
        const transformed = toProtocolData(protocol);
        setProtocolData(transformed);
      }
    }
  }, [balance]);

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
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
            {translation.Tables.asset}
          </div>
          <div
            className={classNames(styles.title, styles.price, {
              [styles.hidden]: filters.vaults.value,
            })}
          >
            {translation.Table.balance}
          </div>
          <div
            className={classNames(styles.title, styles.value, {
              [styles.hidden]: filters.vaults.claimable,
            })}
          >
            <Icon className={styles.title_icon} src={iconsObj.sort_frame} sizes="24px" />
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

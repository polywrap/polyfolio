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
import {useLocation} from 'react-router-dom';
import {getStringFromPath} from 'utils/helpers';
import Skeleton from '../Skeleton/Skeleton';
import {chainIdToNetwork} from 'utils/constants';
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';
import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';

function AssetsTable() {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 4);
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance, chainIdToNetwork[page]);
  const [dataRange, setDataRange] = useState<DataRangeSelectorItem>({});
  const [dataRangeIsOpen, setDataRangeIsOpen] = useState(true);
  const assets = useAssets(dataRange);

  const changeDataRange = (e) => {
    setDataRange(e);
    setDataRangeIsOpen(!dataRangeIsOpen);
  };

  const onChange = (name, value) => {
    setFilter({...filters, assets: {...filter.assets, [name]: !value?.checked}});
  };

  return preparedData['balance'] ? (
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
        changeDataRange={changeDataRange}
        dataRange={dataRange}
        dataRangeIsOpen={dataRangeIsOpen}
        setDataRangeIsOpen={setDataRangeIsOpen}
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
  ) : (
    <div style={{margin: '48px 0'}}>
      <Skeleton width={1256} height={923} />
    </div>
  );
}

export default AssetsTable;

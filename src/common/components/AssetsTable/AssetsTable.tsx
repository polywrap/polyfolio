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
<<<<<<< Updated upstream
import Skeleton from '../Skeleton/Skeleton';
import {chainIdToNetwork} from 'utils/constants';
=======
>>>>>>> Stashed changes
import {DataRangeSelectorItem} from '../DateRangeSelector/DataRangeSelector.types';
import numberFormatter from 'utils/numberFormatter';
<<<<<<< Updated upstream
import {Currency, CurrencySymbol} from 'common/currency/Currency.types';
=======
import {CurrencySymbol} from 'common/currency/Currency.types';
import Dots from '../Loaders/Dots';
import useBalance from 'common/hooks/useBalance/useBalance';
import {useNetworks} from 'common/networks/Networks.context';
import {useBalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import {AssetData, Currency} from 'common/types';
>>>>>>> Stashed changes

interface Props {
  assets: AssetData[];
  total: string | number;
}

function AssetsTable({assets, total = ''}: Props) {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 4);
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const {filters, setFilters} = useFiltersTables();
  const [filter, setFilter] = useState<Filters>(filters);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const [dataRange, setDataRange] = useState<DataRangeSelectorItem>({});
  const [dataRangeIsOpen, setDataRangeIsOpen] = useState(true);

  const changeDataRange = (e) => {
    setDataRange(e);
    setDataRangeIsOpen(!dataRangeIsOpen);
  };

  const onChange = (name, value) => {
    setFilter({...filters, assets: {...filter.assets, [name]: !value?.checked}});
  };

  const sum = total && `${CurrencySymbol[Currency.USD.toUpperCase()]} ${numberFormatter(total)}`;

  return assets ? (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        onSaveFilter={() => {
          setFilters(filter);
          setIsOpen(!isOpen);
        }}
        setIsOpen={() => setIsOpen(!isOpen)}
        title={translation.Table.title}
        menuFields={menuFields}
        filter={filter.assets}
        onChange={onChange}
        isOpen={isOpen}
        sum={sum}
        changeDataRange={changeDataRange}
        dataRange={dataRange}
        dataRangeIsOpen={dataRangeIsOpen}
        setDataRangeIsOpen={setDataRangeIsOpen}
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>{translation.Table.asset}</div>
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
        {assets.map((asset) => (
          <AssetsTableItem key={asset.id} asset={asset} dateRange={dataRange} />
        ))}
      </div>
    </div>
  ) : (
<<<<<<< Updated upstream
    <div style={{margin: '48px 0'}}>
      <Skeleton width={100} height={923} />
=======
    <div style={{margin: '48px 0', display: 'flex', height: '100%', alignItems: 'center'}}>
      <Dots width={180} />
>>>>>>> Stashed changes
    </div>
  );
}

export default AssetsTable;

import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import _map from 'lodash/map';
import styles from './AssetsTable.module.scss';

import GetItems from './AssetsTableItem/AssetsTableItem.config';
import AssetsTableItem from './AssetsTableItem/AssetsTableItem';
import useTheme from 'common/hooks/useTheme/useTheme';
import HeaderTable from '../HeaderTable/HeaderTable';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function AssetsTable() {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme();
  const translation = useTranslation();
  const assets = GetItems();

  return (
    <div ref={ref} className={classNames(styles[theme], styles.protocolsContainer)}>
      <HeaderTable
        setTableIsOpen={() => setTableIsOpen(!tableIsOpen)}
        setIsOpen={() => setIsOpen(!isOpen)}
        title={translation.Table.assets}
        isOpen={isOpen}
        sum={9337337.0}
      />
      <div className={classNames(styles.table_container, {[styles.hidden]: tableIsOpen})}>
        <div className={styles.title_container}>
          <div className={classNames(styles.title, styles.assets)}>{translation.Table.assets}</div>
          <div className={classNames(styles.title, styles.allocation)}>
            {translation.Table.allocation}
          </div>
          <div className={classNames(styles.title, styles.price)}>{translation.Table.price}</div>
          <div className={classNames(styles.title, styles.value)}>
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

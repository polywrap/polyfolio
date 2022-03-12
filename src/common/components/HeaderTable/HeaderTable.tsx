import React, {useState} from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import styles from './HeaderTable.module.scss';
import numberFormatter from 'utils/numberFormatter';
import DataRangeSelector from '../DateRangeSelector/DateRangeSelector';

function HeaderTable({
  setTableIsOpen,
  title,
  sum,
}: {
  title: string;
  sum: number;
  setTableIsOpen: any;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [dataRange, setDataRange] = useState({});

  const changeDataRange = (e) => {
    setDataRange(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.headerTableContainer}>
      <div className={styles.title_container}>
        <h3>{title}</h3>
        <DataRangeSelector
          setDataRange={changeDataRange}
          className={styles.btn}
          setIsOpen={setIsOpen}
          dataRange={dataRange}
          isOpen={isOpen}
          fontSize="14px"
        />
      </div>
      <div className={styles.filter_container}>
        <h4>${numberFormatter({value: sum, size: 2})}</h4>
        <button>
          <Icon src={iconsObj.filterIcon} className={styles.icon} />
        </button>
        <button onClick={() => setTableIsOpen()}>
          <Icon
            src={iconsObj.filterIconSecondary}
            className={classNames(styles.icon, styles.iconFilter)}
          />
        </button>
      </div>
    </div>
  );
}

export default HeaderTable;

import React from 'react';
import classNames from 'classnames';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import styles from './HeaderTable.module.scss';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import numberFormatter from 'utils/numberFormatter';

function HeaderTable({title, sum}) {
  return (
    <div className={styles.flex}>
      <div className={styles.title_container}>
        <h3>{title}</h3>
        <button className={styles.btn}>
          1D <MenuArrow className={styles.arrow} filled startPosition={'up'} />
        </button>
      </div>
      <div className={styles.filter_container}>
        <h4>${numberFormatter({value: sum, size: 2})}</h4>
        <button>
          <Icon src={iconsObj.filterIcon} className={styles.icon} />
        </button>
        <button>
          <Icon
            src={iconsObj.filter_icon_secondary}
            className={classNames(styles.icon, styles.iconFilter)}
          />
        </button>
      </div>
    </div>
  );
}

export default HeaderTable;

import React from 'react';
import styles from './ProtocolTableItem.module.scss';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';

import classNames from 'classnames';

import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';

function ProtocolsItem(menuItem) {
  const translation = useTranslation();

  return (
    <>
      {!menuItem.isDivider ? (
        <div className={styles.menu_item}>
          <div className={classNames(styles.flex, styles.title_container)}>
            <Icon src={menuItem.icon} className={styles.icon} />
            <div className={styles.title}>{translation.Protocols[menuItem.title]}</div>
          </div>
          <div className={styles.price_container}>
            <div className={styles.secondaryTitle}>
              ${numberFormatter({value: menuItem.valueTitle, size: 2})}
            </div>
            <div className={classNames(styles.flex, styles.price_container_value)}>
              <div
                className={classNames(styles.secondaryPriceTitle, {
                  [styles.minusValuePrice]: menuItem.valueIsMinus,
                })}
              >
                ${numberFormatter({value: menuItem.secondaryTitleDollar, size: 2})}
              </div>
              <div
                className={classNames(styles.secondaryPricePercentTitle, {
                  [styles.minusValue]: menuItem.valueIsMinus,
                })}
              >
                +{numberFormatter({value: menuItem.secondaryTitlePercent, size: 2})}%
              </div>
            </div>
          </div>
          <div className={classNames(styles.claimable_container, styles.flex)}>
            <div className={styles.secondaryTitle}>
              ${numberFormatter({value: menuItem.claimableValue, size: 2})}
            </div>
            <button>
              <MenuArrow className={styles.arrowIcon} startPosition="right" size="10px" />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.divider} />
      )}
    </>
  );
}

export default ProtocolsItem;

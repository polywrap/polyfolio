import React from 'react';
import styles from './ProtocolTableItem.module.scss';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import PricesValue from '../../PricesValue/PricesValue';

function ProtocolsItem(menuItem) {
  const translation = useTranslation();
  const {
    secondaryTitleDollar,
    secondaryTitlePercent,
    claimableValue,
    valueIsMinus,
    valueTitle,
    isDivider,
    title,
    icon,
  } = menuItem;

  return (
    <>
      {!isDivider ? (
        <div className={styles.menu_item}>
          <div className={styles.title_container}>
            <Icon src={icon} className={styles.icon} />
            <div className={styles.title}>{translation.Protocols[title]}</div>
          </div>
          <PricesValue
            secondaryPricePercentTitle={secondaryTitlePercent}
            pricePercentDollar={secondaryTitleDollar}
            className={styles.price_container}
            valueIsMinus={valueIsMinus}
            priceTitle={valueTitle}
          />
          <div className={styles.claimable_container}>
            <div className={styles.secondaryTitle}>
              ${numberFormatter({value: claimableValue, size: 2})}
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

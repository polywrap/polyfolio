import React from 'react';
import styles from './VaultsTableItem.module.scss';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';
import _map from 'lodash/map';
import PricesValue from 'common/components/PricesValue/PricesValue';
import {fillArray} from 'utils/helpers';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import classNames from 'classnames';

function VaultsItem(menuItem) {
  const translation = useTranslation();
  const {
    secondaryPricePercentTitle,
    pricePercentDollar,
    secondaryTitle,
    valueIsMinus,
    priceTitle,
    valueTitle,
    isDivider,
    percent,
    title,
    icon,
  } = menuItem;

  const {filters} = useFiltersTables();

  return (
    <>
      {!isDivider ? (
        <button className={styles.buttonNavigate}>
          <div className={styles.menu_item}>
            <div className={styles.title_container}>
              <Icon src={icon} className={styles.icon} />
              <div>
                <div className={styles.title}>{translation.Assets[title]}</div>
                <div className={styles.titleSecondary}>{translation.Assets[secondaryTitle]}</div>
              </div>
            </div>
            <div
              className={classNames(styles.container_allocation, {
                [styles.hidden]: filters.vaults.allocation,
              })}
            >
              {_map(fillArray(100), (i) => {
                return (
                  <div
                    className={classNames(styles.aggregate, {
                      [styles.opacityAggregate]: i > percent,
                    })}
                  />
                );
              })}
              <div className={styles.bg}>
                <span className={styles.badgeText}>
                  {numberFormatter({value: percent, size: 0})}%
                </span>
              </div>
            </div>
            <PricesValue
              secondaryPricePercentTitle={secondaryPricePercentTitle}
              pricePercentDollar={pricePercentDollar}
              className={classNames(styles.price_container, {
                [styles.hidden]: filters.vaults.value,
              })}
              valueIsMinus={valueIsMinus}
              priceTitle={priceTitle}
            />
            <div
              className={classNames(styles.value_container, {
                [styles.hidden]: filters.vaults.claimable,
              })}
            >
              <div>
                <div className={styles.valueTitle}>
                  ${numberFormatter({value: valueTitle, size: 2})}
                </div>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <div className={styles.divider} />
      )}
    </>
  );
}

export default VaultsItem;

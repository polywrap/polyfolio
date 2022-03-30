import React from 'react';
import styles from './AssetsTableItem.module.scss';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import {useNavigate} from 'react-router-dom';

import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';
import PricesValue from 'common/components/PricesValue/PricesValue';
import _map from 'lodash/map';
import classNames from 'classnames';
import {fillArray} from 'utils/helpers';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';

function AssetsItem(menuItem) {
  const {filters} = useFiltersTables();
  const translation = useTranslation();
  const navigate = useNavigate();
  const {
    secondaryPricePercentTitle,
    valueSecondaryTitle,
    pricePercentDollar,
    secondaryTitle,
    valueIsMinus,
    priceTitle,
    valueTitle,
    percent,
    title,
    link,
    icon,
    id,
  } = menuItem;
  const path = id && link.replace(':id', `${id}`);

  return (
    <>
      <button className={styles.buttonNavigate} onClick={() => navigate(path)}>
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
              [styles.hidden]: filters.assets.allocation,
            })}
          >
            {_map(fillArray(100), (i) => {
              return (
                <div
                  key={i}
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
              [styles.hidden]: filters.assets.price,
            })}
            valueIsMinus={valueIsMinus}
            priceTitle={priceTitle}
          />
          <div
            className={classNames(styles.value_container, {
              [styles.hidden]: filters.assets.value,
            })}
          >
            <div>
              <div className={styles.valueTitle}>
                ${numberFormatter({value: valueTitle, size: 2})}
              </div>
              <div className={styles.valueSecondaryContainer}>
                ${numberFormatter({value: valueSecondaryTitle, size: 2})}
                <div style={{marginLeft: '5px'}}>{translation.Assets[title]}</div>
              </div>
            </div>
            <MenuArrow className={styles.arrowIcon} startPosition="right" size="10px" />
          </div>
        </div>
      </button>
    </>
  );
}

export default AssetsItem;

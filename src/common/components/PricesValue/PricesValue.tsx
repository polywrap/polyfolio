import React from 'react';
import classNames from 'classnames';
import styles from './PricesValue.module.scss';
import numberFormatter from 'utils/numberFormatter';

function PricesValue({
  secondaryPricePercentTitle,
  pricePercentDollar,
  valueIsMinus,
  priceTitle,
  className,
}) {
  return (
    <div className={className}>
      <div className={styles.title}>${numberFormatter({value: priceTitle, size: 2})}</div>
      <div className={styles.price_container_value}>
        <div
          className={classNames(styles.secondaryPriceTitle, {
            [styles.minusValuePrice]: valueIsMinus,
          })}
        >
          ${numberFormatter({value: pricePercentDollar, size: 2})}
        </div>
        <div
          className={classNames(styles.secondaryPricePercentTitle, {
            [styles.minusValue]: valueIsMinus,
          })}
        >
          +{numberFormatter({value: secondaryPricePercentTitle, size: 2})}%
        </div>
      </div>
    </div>
  );
}
export default PricesValue;

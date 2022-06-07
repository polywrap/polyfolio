import React from 'react';
import classNames from 'classnames';
import styles from './PricesValue.module.scss';
import numberFormatter from 'utils/numberFormatter';
import Skeleton from '../Skeleton/Skeleton';

function PricesValue({
  secondaryPricePercentTitle,
  pricePercentDollar,
  valueIsMinus,
  priceTitle,
  className,
}) {
  return (
    <div className={className}>
      <div className={styles.title}>${numberFormatter(priceTitle)}</div>
      <div className={styles.price_container_value}>
        <div
          className={classNames(styles.secondaryPriceTitle, {
            [styles.minusValuePrice]: valueIsMinus,
          })}
        >
          {pricePercentDollar ? (
            valueIsMinus ? (
              '-' + '$' + numberFormatter(pricePercentDollar).substring(1)
            ) : (
              '+' + '$' + numberFormatter(pricePercentDollar)
            )
          ) : (
            <Skeleton width={54} height={19} />
          )}
        </div>
        <div
          className={classNames(styles.secondaryPricePercentTitle, {
            [styles.minusValue]: valueIsMinus,
          })}
        >
          {secondaryPricePercentTitle ? (
            (valueIsMinus ? '' : '+') +
            numberFormatter(secondaryPricePercentTitle) +
            '%'
          ) : (
            <Skeleton width={54} height={19} />
          )}
        </div>
      </div>
    </div>
  );
}
export default PricesValue;

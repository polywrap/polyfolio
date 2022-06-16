import React from 'react';
import classNames from 'classnames';
import styles from './PricesValue.module.scss';
import numberFormatter from 'utils/numberFormatter';
import Skeleton from '../Loaders/Skeleton';
import Dots from '../Loaders/Dots';

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
        {pricePercentDollar && secondaryPricePercentTitle ? (
          <>
            <div
              className={classNames(styles.secondaryPriceTitle, {
                [styles.minusValuePrice]: valueIsMinus,
              })}
            >
              {valueIsMinus
                ? '-' + '$' + numberFormatter(pricePercentDollar).substring(1)
                : '+' + '$' + numberFormatter(pricePercentDollar)}
            </div>
            <div
              className={classNames(styles.secondaryPricePercentTitle, {
                [styles.minusValue]: valueIsMinus,
              })}
            >
              {(valueIsMinus ? '' : '+') + numberFormatter(secondaryPricePercentTitle) + '%'}
            </div>
          </>
        ) : (
          <Dots width={60} style={{margin: 0}} />
        )}
      </div>
    </div>
  );
}
export default PricesValue;

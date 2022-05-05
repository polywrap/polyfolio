import React from 'react';
import styles from './ProtocolTableItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';
import {useNavigate} from 'react-router-dom';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import PricesValue from '../../PricesValue/PricesValue';
import classNames from 'classnames';
import useSearch from 'common/hooks/useSearch/useSearch';
import useAuth from 'common/hooks/useAuth/useAuth';
import { networkToChainId } from 'utils/constants';

function ProtocolsItem(menuItem) {
  const navigate = useNavigate();
  const {user} = useAuth();
  const {
    secondaryTitleDollar,
    secondaryTitlePercent,
    claimableValue,
    valueIsMinus,
    valueTitle,
    network,
    title,
    link,
    icon,
    symbol,
  } = menuItem;
  const {search} = useSearch();
  const path = symbol && !search 
    ? link.replace(':protocol', `${symbol}`)
        .replace(':chainId', `${networkToChainId[network]}`)
        .replace(':user', `${user}`)
    : search 
      ? link.replace(':protocol', `${symbol}`)
          .replace(':chainId', `${networkToChainId[network]}`)
          .replace(':user', `${search}`) 
      : RoutePath.NotFound;

  const {filters} = useFiltersTables();

  return (
    <>
      <button className={styles.button} onClick={() => navigate(path)}>
        <div className={styles.menu_item}>
          <div className={styles.title_container}>
            <Icon src={icon} className={styles.icon} />
            <div className={styles.title}>{title}</div>
          </div>
          <PricesValue
            secondaryPricePercentTitle={secondaryTitlePercent}
            pricePercentDollar={secondaryTitleDollar}
            className={classNames(styles.price_container, {
              [styles.hidden]: filters.protocols.value,
            })}
            valueIsMinus={valueIsMinus}
            priceTitle={valueTitle}
          />
          <div
            className={classNames(styles.claimable_container, {
              [styles.hidden]: filters.protocols.claimable,
            })}
          >
            <div className={styles.secondaryTitle}>
              ${numberFormatter({value: claimableValue, size: 2})}
            </div>
            <MenuArrow className={styles.arrowIcon} startPosition="right" size="10px" />
          </div>
        </div>
      </button>
    </>
  );
}

export default ProtocolsItem;

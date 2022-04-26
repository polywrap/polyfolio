import React from 'react';
import styles from './ProtocolTableItem.module.scss';
//import useTranslation from 'common/hooks/useTranslation/useTranslation';
import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';
import {useNavigate} from 'react-router-dom';

import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import PricesValue from '../../PricesValue/PricesValue';
import classNames from 'classnames';
import useSearch from 'common/hooks/useSearch/useSearch';

function ProtocolsItem(menuItem) {
  const navigate = useNavigate();
  //const translation = useTranslation();
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
    id,
  } = menuItem;
  const {search} = useSearch();
  const path = id && !search ? link.replace(':id', `${id}`).replace(':net', `${network}`)
    : search ? link.replace(':id', `${id}`).replace(':net', `${network}`) + `?${search}` 
    : '/404';

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

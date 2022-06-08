import React from 'react';
import styles from './ProtocolTableItem.module.scss';
import Icon from 'common/components/Icon/Icon';
import numberFormatter from 'utils/numberFormatter';
import {useNavigate} from 'react-router-dom';
import iconsObj from 'assets/icons/iconsObj';
import MenuArrow from 'common/components/MenuArrow/MenuArrow';
import useFiltersTables from 'common/hooks/useFiltersTables/useFilters';
import PricesValue from '../../PricesValue/PricesValue';
import classNames from 'classnames';
import {networkToChainId} from 'utils/constants';
import RoutePath from 'common/modules/routing/routing.enums';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import {useRecoilValue} from 'recoil';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';

function ProtocolsItem(menuItem) {
  const navigate = useNavigate();
  const user = useRecoilValue(userPersistState);
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
  const search = useRecoilValue(searchPersistState);
  const path =
    symbol && !search
      ? replaceRouteParameters(link, {chainId: networkToChainId[network], user, protocol: symbol})
      : search
      ? replaceRouteParameters(link, {chainId: networkToChainId[network], search, protocol: symbol})
      : RoutePath.NotFound;

  const {filters} = useFiltersTables();

  return (
    <>
      <button className={styles.button} onClick={() => navigate(path)}>
        <div className={styles.menu_item}>
          <div className={styles.title_container}>
            <div className={styles.icon_container}>
              <Icon src={icon} className={styles.icon} />
              <img src={iconsObj[network] as string} className={styles.networkIcon} />
            </div>
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
            <div className={styles.secondaryTitle}>${numberFormatter(claimableValue)}</div>
            <MenuArrow className={styles.arrowIcon} startPosition="right" size="10px" />
          </div>
        </div>
      </button>
    </>
  );
}

export default ProtocolsItem;

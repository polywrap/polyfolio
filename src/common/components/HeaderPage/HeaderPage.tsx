import React from 'react'

import classNames from 'classnames'
import iconsObj from 'assets/icons/iconsObj';
import styles from './HeaderPage.module.scss';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import useSearch from 'common/hooks/useSearch/useSearch';
import RoutePath from 'common/modules/routing/routing.enums';
import replaceRouteParameters from 'utils/replaceRouteParameters';

interface IHeaderPage {
  icon: string;
  title: string;
  secondaryTitle?: string;
}

function HeaderPage({
  icon,
  title,
  secondaryTitle,
}: IHeaderPage) {
  const theme = useTheme();
  const {search} = useSearch();
  const translation = useTranslation();

  const to = search ? replaceRouteParameters(RoutePath.Dashboard, {search}) : RoutePath.BaseRoute;

  return (
    <div className={classNames(styles[theme])}>
      <div>
        <NavLink className={styles.link} to={to}>
          <div className={styles.arrow_container}>
            <Icon src={iconsObj.backArrow} className={styles.arrow} />
          </div>
          {translation.Common.linkBackToDashboard}
        </NavLink>
      </div>
      <div className={styles.title}>
        <Icon src={icon} className={styles.img} />
        <div className={styles.text}>
          {title}
          <span>{secondaryTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderPage;

import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './HiglightedAddress.module.scss';
import Icon from '../Icon/Icon';

function HiglightedAddress({icon, address}) {
  const theme = useTheme();

  return (
    <div className={classNames(style[theme], style.body)}>
      <Icon src={icon} className={style.profile} />
      <span className={style.address}>{address}</span>
    </div>
  );
}

export default HiglightedAddress;

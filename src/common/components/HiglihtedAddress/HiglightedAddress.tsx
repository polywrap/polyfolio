import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './HiglightedAddress.module.scss';
import Icon from '../Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';

function HiglightedAddress() {
  const theme = useTheme()

  return (
    <div className={classNames(style[theme], style.body)}>
      <Icon src={iconsObj.profile} className={style.profile} />
      <span className={style.address}>0x378...3832</span>
    </div>
  )
}

export default HiglightedAddress
